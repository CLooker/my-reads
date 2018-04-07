import React, { Component } from 'react';
import SearchBar from './SearchBar';
import BookRow from './BookRow';

class Search extends Component {
  render() {
    const {
      closeSearch,
      search,
      handleChange,
      query,
      searchResults,
      changeBookshelf
    } = this.props;
    return (
      <div>
        <SearchBar
          closeSearch={closeSearch}
          search={search}
          handleChange={handleChange}
          query={query}
        />
        <BookRow
          myReads=""
          shelfTitle="Search Results"
          shelf={searchResults}
          changeBookshelf={changeBookshelf}
          displaySearch={true}
        />
      </div>
    );
  }
}

export default Search;
