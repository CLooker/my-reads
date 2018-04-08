import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = ({ ...routeProps }) => (
  <div className="open-search">
    <Link to={`${routeProps.match.path}/search`}>Add a book</Link>
  </div>
);

export default SearchButton;
