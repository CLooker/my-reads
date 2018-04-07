import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = ({ resetSearch, ...routeProps }) => (
  <div className="open-search">
    <Link onClick={resetSearch} to={`${routeProps.location.pathname}/search`}>
      Add a book
    </Link>
  </div>
);

export default SearchButton;
