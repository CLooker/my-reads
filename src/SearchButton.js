import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './App.css';

const SearchButton = function(props) {
	return (
		<div className="open-search">
      <a onClick={props.addBook}>Add a book</a>
    </div>
  )
}

export default SearchButton;