import React, { Component } from 'react';
import SearchBar from './SearchBar';
import BookRow from './BookRow';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

export default class SearchView extends Component {
  static propTypes = {
    shelfKeyValueStore: PropTypes.object.isRequired,
    setStateOnApiReturn: PropTypes.func.isRequired,
    getShelfAndRender: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let flag = false;
    const newSearchResults = Object.keys(nextProps.shelfKeyValueStore)
      .map(key => nextProps.shelfKeyValueStore[key])
      .map(book => {
        const target = book.id;
        const match = prevState.searchResults.find(({ id }) => id === target);
        if (match) {
          if (match.shelf !== target.shelf) {
            flag = true;
          }
        }
        return book;
      });

    if (flag === true) {
      return {
        query: prevState.query,
        searchResults: prevState.searchResults.map(book => {
          const target = book.id;
          const newVersion = newSearchResults.find(({ id }) => id === target);
          if (newVersion) {
            return newVersion;
          } else {
            return book;
          }
        })
      };
    } else {
      return null;
    }
  }

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
    ).then(this.props.setStateOnApiReturn);

  handleChange = e =>
    this.setState({ query: e.target.value }, () =>
      this.search(this.state.query)
    );

  returnSearchBarProps = () => ({
    handleChange: this.handleChange,
    query: this.state.query
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
