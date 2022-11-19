//Design (верстка) made not by me !!!

import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add/employers-add";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Алик Осмонов  ",
          salary: 300,
          increase: false,
          rise: false,
          id: 1,
        },
        {
          name: "Асман Айдар уулу ",
          salary: 3000,
          increase: false,
          rise: false,
          id: 2,
        },
        {
          name: "Кудурет Манасов",
          salary: 2200,
          increase: false,
          rise: false,
          id: 3,
        },
        {
          name: "Атабек Кененбай",
          salary: 2000,
          increase: false,
          rise: false,
          id: 4,
        },
        {
          name: "Артем Семенов ",
          salary: 1100,
          increase: false,
          rise: true,
          id: 5,
        },
      ],
      term: "",
      filter: "all",
      onSalaryChanged: "",
    };
    this.maxId = 6;
  }

  onSalaryChange = (onSalaryChanged) => {
    console.log(onSalaryChanged);
    this.setState({ onSalaryChanged: onSalaryChanged });
  };

  // onSalaryChange = (e) => {
  //   this.setState({
  //     [this.data.salary]: e.target.value,
  //   });
  // };

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.onAdd(this.state.name, this.state.salary);
  //   this.setState({
  //     name: "",
  //     salary: "",
  //   });
  // };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };
  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  // we need to find an index of data
  // onSalaryChange = (salary) => {
  //   this.setState(({ data }) => {
  //     const newSalaryArr = [...data, changeSalary];
  //     return {
  //       data: newSalaryArr,
  //     };
  //   });
  // };

  onToggleIncrease = (id) => {
    //Первый вариант
    // this.setState(({ data }) => {
    //   // определить объект с данными , который взаимодействует пользователь(получаем индекс элемента с которым будем работать )
    //   const index = data.findIndex((elem) => elem.id === id);
    //   // взять этот объект по индексу и сделать копию(делаем копию из-за того , что нельзя напрямую менять обьекты state )
    //   const old = data[index];
    //   // новый объект , готовый к перемнам , поменять свойство
    //   const newItem = { ...old, increase: !old.increase }; // "!" - also means 'make it or do it vice versa '
    //   //создать новый state  // если честно вообще не понял что здесь происходит
    //   const newArr = [
    //     //just before 😁
    //     ...data.slice(0, index),
    //     //after🥳
    //     newItem,
    //     ...data.slice(index + 1),
    //   ];
    //   //поменять в компоненте
    //   return {
    //     //поместить новый объект в актуальный
    //     data: newArr,
    //   };
    // })};

    //второй вариант

    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          console.log(item);
          return { ...item, increase: !item.increase };
        }
        return item;
      }),
    }));
  };

  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, rise: !item.rise };
        }
        return item;
      }),
    }));
  };
  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.includes(term);
    });
  };
  onUpdateSeacrh = (term) => {
    this.setState({ term: term });
  };

  // onUpdateSalary = (changeSalaryData) => {
  //   this.setState({ changeSalaryData: changeSalaryData });
  // };

  // moreThanBtn = (items) => {
  //   this.setState(({ data }) => {
  //     data: data.map((item) => {
  //       if ((item.rise = true)) {
  //         return {
  //           ...item,
  //           rise: item.rise,
  //         };
  //       }
  //     });
  //   });
  // };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThan1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const allEmployees = this.state.data.length;
    const increasedEmployees = this.state.data.filter(
      (item) => item.increase
    ).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          allEmployees={allEmployees}
          increasedEmployees={increasedEmployees}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSeacrh={this.onUpdateSeacrh} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <div>
          <EmployersList
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleIncrease={this.onToggleIncrease}
            onToggleRise={this.onToggleRise}
            onSalaryChange={this.onSalaryChange}
            // onUpdateSalary={this.onUpdateSalary}
          />

          <EmployersAddForm onAdd={this.addItem} />
        </div>
      </div>
    );
  }
}

export default App;
