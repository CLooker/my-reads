import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = ({ resetSearch, ...location }) => (
  <div className="open-search">
    <Link onClick={resetSearch} to="my-reads/search">
      Add a book
    </Link>
  </div>
);

export default SearchButton;
