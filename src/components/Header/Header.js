import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div>
      <div className="header jumbotron-fluid" id="header">
        <div className="container">
          <h1><span className="text">Employee Directory</span></h1>
          <p id="hp">Click on arrows to filter by heading - OR - search by First and Last Name</p>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default Header;
