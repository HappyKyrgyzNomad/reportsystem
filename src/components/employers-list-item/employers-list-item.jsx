// import { Component } from "react";

import { Component } from "react";
import "./employers-list-item.css";

class EmployersListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSalaryChanged: "",
    };
  }

  onSalaryChangelocal = (e) => {
    const value = e.target.value;
    this.setState({ onSalaryChanged: value });
    this.props.onSalaryChange(this.state.onSalaryChanged);
  };

  render() {
    const {
      name,
      salary,
      onDelete,
      onToggleIncrease,
      onToggleRise,
      increase,
      rise,
      onSalaryChange,
    } = this.props;
    const { onSalaryChanged } = this.state;

    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
      classNames += " increase";
    }
    if (rise) {
      classNames += " like";
    }
    return (
      <li className={classNames}>
        <span className="list-group-item-label" onClick={onToggleRise}>
          {name}
        </span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={salary + "$"}
          onChange={this.onSalaryChangelocal}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-cookie btn-sm "
            onClick={onToggleIncrease}
          >
            <i className="fas fa-cookie"></i>
          </button>

          <button
            type="button"
            className="btn-trash btn-sm "
            onClick={onDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  }
}

export default EmployersListItem;
