import React, { Component } from 'react';
import SearchBar from './SearchBar';
import BookRow from './BookRow';
import * as BooksAPI from './BooksAPI';

export default class SearchView extends Component {
  state = {
    query: '',
    searchResults: []
  };

  resetSearch = () => this.setState({ searchResults: [] });

  search = query =>
    query
      ? BooksAPI.search(query).then(this.handleSearchReturn)
      : this.resetSearch();

  handleSearchReturn = res =>
    console.log('search returned this: ', res) ||
    (res !== undefined
      ? this.setState({
          searchResults: res.map(
            bookObj => this.props.shelfKeyValueStore[bookObj.id] || bookObj
          )
        })
      : this.resetSearch());

  changeBookshelf = e =>
    BooksAPI.update(
      { id: e.currentTarget.getAttribute('data') },
      e.target.value.trim()
    )
      .then(this.asyncApiReturn)
      .then(() => this.asyncSearch(this.state.query));

  handleChange = e =>
    this.setState({ query: e.target.value }, () =>
      this.asyncSearch(this.state.query)
    );

  asyncSearch = async query => await this.search(query);

  asyncApiReturn = async apiReturn =>
    await this.props.setStateOnApiReturn(apiReturn);

  returnSearchBarProps = () => ({
    search: this.search,
    handleChange: this.handleChange,
    query: this.query
  });

  returnBookRowProps = () => ({
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
