import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

const SearchBar = ({ closeSearch, query, handleChange }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link className="close-search" onClick={closeSearch} to="/my-reads">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid" />
    </div>
  </div>
);

export default SearchBar;
