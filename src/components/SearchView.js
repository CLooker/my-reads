import React, { Component } from 'react';
import SearchBar from './SearchBar';
import BookRow from './BookRow';
import * as BooksAPI from './BooksAPI';

export default class SearchView extends Component {
  state = {
    query: '',
    searchResults: []
  };

  closeSearch = () => this.getShelfAndRender();

  resetSearch = () => this.setState({ searchResults: [] });

  search = query =>
    query
      ? BooksAPI.search(query).then(queryReturned => {
          switch (queryReturned.error || queryReturned !== undefined) {
            case queryReturned.error:
              return this.resetSearch();
            case queryReturned !== undefined:
              return this.setState({
                searchResults: queryReturned.map(
                  bookObj =>
                    this.props.shelfKeyValueStore[bookObj.id] || bookObj
                )
              });
            default:
              return this.resetSearch();
          }
        })
      : this.resetSearch();

  changeBookshelf = e =>
    BooksAPI.update(
      { id: e.currentTarget.getAttribute('data') },
      e.target.value.trim()
    )
      .then(this.asyncApiReturn)
      .then(() => this.search(this.state.query));

  handleChange = e =>
    this.setState({ query: e.target.value }, () =>
      this.asyncSearch(this.state.query)
    );

  asyncSearch = async query => await this.search(query);

  asyncApiReturn = async apiReturn =>
    await this.props.setStateOnApiReturn(apiReturn);

  returnSearchBarProps = () => ({
    closeSearch: this.closeSearch,
    search: this.search,
    handleChange: this.handleChange,
    query: this.query
  });

  returnBookRowProps = () => ({
    myReads: '',
    shelfTitle: 'Search Results',
    shelf: this.state.searchResults,
    changeBookshelf: this.changeBookshelf,
    displaySearch: true
  });

  render() {
    return (
      <div>
        <SearchBar {...this.returnSearchBarProps()} />
        <BookRow {...this.returnBookRowProps()} />
      </div>
    );
  }
}
