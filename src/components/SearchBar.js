import React from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

const SearchBar = ({ query, handleChange }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link className="close-search" to="/my-reads">
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

SearchBar.propTypes = {
  query: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default SearchBar;
