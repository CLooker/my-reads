import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = function(props) {
  return (
    <div className="open-search">
      <Link onClick={props.resetSearch} to="my-reads/search">
        Add a book
      </Link>
    </div>
  );
};

export default SearchButton;
