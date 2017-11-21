import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import './App.css';

const SearchBar = function(props) {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            onClick={props.closeSearch}
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
              <DebounceInput
                minLength={1}
                debounceTimeout={300}
                type="text"
                value={props.query}
                placeholder="Search by title or author"
                onChange={props.handleChange}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
}

export default SearchBar;