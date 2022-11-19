import "./app-info.css";

const AppInfo = ({ increasedEmployees, allEmployees }) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании Avia Traffic </h1>
      <h2>Общее число сотрудников: {allEmployees}</h2>
      <h2>Премию получат :{increasedEmployees}</h2>
    </div>
  );
};
export default AppInfo;
