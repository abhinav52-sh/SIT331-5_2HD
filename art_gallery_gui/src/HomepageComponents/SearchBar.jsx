import React from "react";
import { Link } from "react-router-dom";

function Search(props) {
  const handleInputChange = (event) => {
    const searchText = event.target.value;
    props.onChange(searchText);
  };

  return (
    <div className="Search_bar">
      <p className="MainText">
        {" "}
        <Link to="/" className="link">
          Art Gallery
        </Link>{" "}
      </p>
      <input
        type="search"
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleInputChange}
      />

      <p className="SearchLink3 SearchLinks">
        <Link className="link" to="/artists">
          Artists
        </Link>
      </p>

      <p className="SearchLink2 SearchLinks">
        <Link className="link" to="/artifacts">
          Artefacts
        </Link>
      </p>

      {props.loggedIn ? (
        <p className="SearchLink1 SearchLinks">
          <Link className="link" to="/profile">
            Profile
          </Link>
        </p>
      ) : (
        <p className="SearchLink1 SearchLinks">
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      )}
    </div>
  );
}

export default Search;
