import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const SearchButton = function(props) {
	return (
		<div className="open-search">
      <Link
      	onClick={props.resetSearch}
      	to="/search"
      >Add a book</Link>
    </div>
  )
}

export default SearchButton;