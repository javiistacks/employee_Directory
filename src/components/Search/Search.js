import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <form>
      <div className="form-group">
        <div className="input-group">
          <input 
            onChange={props.handleInputChange} 
            value={props.search} 
            name="search" 
            type="text" 
            className="form-control" 
            placeholder="Search here" 
            id="search" />
        </div>
      </div>
    </form>
  );
}

export default Search;
