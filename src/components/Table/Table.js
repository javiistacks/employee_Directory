import React from "react";
import API from "../../util/API.js"
import Search from "../Search/Search";
import "./Table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
//npm package to reformat DOB
import DateFormat from "dateformat";

class Table extends React.Component {
  state = {
    employeeDB: [],
    filteredPeepsDB: "",
    search: "",
  };

  //Api call for randomuser.me
  componentDidMount() {
    API.getEmployees()
      .then((res) => {
        this.setState({ employeeDB: res.data.results });
        console.log(this.state.employeeDB);
      })
      .catch((err) => console.log(err));
  }

  //Handle input in search bar
  handleInputChange = (event) => {
    if (event.target.name === "search") {
      const searchTerm = event.target.value.toLowerCase();
      this.setState({
        search: searchTerm,
      });
    }
  };

  //Sort by first name
  sortByFName = () => {
    const sortedEmployees = this.state.employeeDB.sort((a, b) => {
      if (b.name.first > a.name.first) { return -1; }
      if (a.name.first > b.name.first) { return 1; }
      return 0;
    });

    if (this.state.filteredPeepsDB === "DESC") {
      sortedEmployees.reverse();
      this.setState({ filteredPeepsDB: "ASC" });
    } else {
      this.setState({ filteredPeepsDB: "DESC" });
    }
    this.setState({ employeeDB: sortedEmployees });
  };

  //Sort by last name
  sortByLName = () => {
    const sortedEmployees = this.state.employeeDB.sort((a, b) => {
      if (b.name.last > a.name.last) { return -1; }
      if (a.name.last > b.name.last) { return 1; }
      return 0;
    });
    if (this.state.filteredPeepsDB === "DESC") {
      sortedEmployees.reverse();
      this.setState({ filteredPeepsDB: "ASC" });
    } else {
      this.setState({ filteredPeepsDB: "DESC" });
    }
    this.setState({ employeeDB: sortedEmployees });
  };

  //Sort by location
  sortByLocation = () => {
    const sortedEmployees = this.state.employeeDB.sort((a, b) => {
      if (b.location.city > a.location.city) { return -1; }
      if (a.location.city > b.location.city) { return 1; }
      return 0;
    });
    if (this.state.filteredPeepsDB === "DESC") {
      sortedEmployees.reverse();
      this.setState({ filteredPeepsDB: "ASC" });
    } else {
      this.setState({ filteredPeepsDB: "DESC" });
    }
    this.setState({ employeeDB: sortedEmployees });
  };

  //Render items
  render() {
    // {props.peeps.length > 0 ? props.peeps.map(props => { 
    return (
      <div className="container">
        <Search handleInputChange={this.handleInputChange} search={this.state.search} />

        <div className="table-responsive">
          <table className="table table-striped table-responsive table-hover table border">
            <thead className="table-head">
              <tr>
                <th>Image</th>
                <th>First Name <span className="downArrow" onClick={this.sortByFName}></span></th>
                <th>Last Name <span className="downArrow" onClick={this.sortByLName}></span></th>
                <th>Location <span className="downArrow" onClick={this.sortByLocation}></span></th>
                <th>Phone</th>
                <th>DOB </th>
              </tr>
            </thead>

            {
              //First Name sort
              this.state.employeeDB && this.state.employeeDB.map((item) =>
                item.name.first.toLowerCase().includes(this.state.search) ? (
                  <tbody key={item.login.uuid}>
                    <tr>
                      <td><img src={item.picture.thumbnail} alt="thumbnail" /></td>
                      <td>{item.name.first}</td>
                      <td>{item.name.last}</td>
                      <td>{item.location.city}</td>
                      <td>{item.phone}</td>
                      <td>{DateFormat(item.dob.date, "mediumDate")}</td>
                    </tr>
                  </tbody>
                ) : //Last Name sort
                item.name.last.toLowerCase().includes(this.state.search) ? (
                  <tbody key={item.login.uuid}>
                    <tr>
                      <td><img src={item.picture.thumbnail} className="rounded-circle" alt="thumbnail" /></td>
                      <td>{item.name.first}</td>
                      <td>{item.name.last}</td>
                      <td>{item.location.city}</td>
                      <td>{item.phone}</td>
                      <td>{DateFormat(item.dob.date, "mediumDate")}</td>
                    </tr>
                  </tbody>
                ) : null
              )
            }
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
