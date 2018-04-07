import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookRow from './BookRow';
import SearchButton from './SearchButton';
import SearchBar from './SearchBar';
import NoMatch from './NoMatch';
import './App.css';

class BooksApp4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      shelf: [],
      shelfKeyValueStore: {},
      currentlyReading: [],
      wantToRead: [],
      read: [],
      searchResults: []
    };
  }

  componentDidMount() {
    this.getShelfAndRender();
  }

  getShelfAndRender = () => {
    BooksAPI.getAll().then(booksReturn => {
      this.setStateOnApiReturn(booksReturn);
    });
  };

  setStateOnApiReturn = apiReturn => {
    if (Array.isArray(apiReturn)) {
      this.setState({
        shelf: apiReturn.map(book => {
          return book;
        }),
        shelfKeyValueStore: apiReturn.reduce((keyValueStore, book) => {
          keyValueStore[book.id] = book;
          keyValueStore[book.id].selectedValue = book.shelf;
          return keyValueStore;
        }, {}),
        currentlyReading: apiReturn.filter(book => {
          return book.shelf === 'currentlyReading';
        }),
        wantToRead: apiReturn.filter(book => {
          return book.shelf === 'wantToRead';
        }),
        read: apiReturn.filter(book => {
          return book.shelf === 'read';
        })
      });
    } else {
      this.getShelfAndRender();
    }
  };

  changeBookshelf = e => {
    const bookId = e.currentTarget.getAttribute('data'),
      newShelf = e.target.value.trim();
    if (newShelf !== '') {
      BooksAPI.update({ id: bookId }, newShelf).then(apiReturn => {
        this.setStateOnApiReturn(apiReturn);
        if (window.location.href.indexOf('search') !== -1) {
          this.getShelfAndRender();
          this.search(this.state.query);
        }
      });
    }
  };

  closeSearch = function() {
    this.getShelfAndRender();
  };

  resetSearch = () => {
    this.setState({
      searchResults: []
    });
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
    this.search(event.target.value);
  };

  search = query => {
    if (query) {
      BooksAPI.search(query).then(queryReturned => {
        switch (queryReturned.error || queryReturned !== undefined) {
          case queryReturned.error:
            this.resetSearch();
            break;
          case queryReturned !== undefined:
            this.setState({
              searchResults: queryReturned.map(bookObj => {
                return this.state.shelfKeyValueStore[bookObj.id] || bookObj;
              })
            });
            break;
          default:
            this.resetSearch();
            break;
        }
      });
    } else {
      this.resetSearch();
    }
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/my-reads/search"
            render={() => (
              <div>
                <SearchBar
                  closeSearch={this.closeSearch}
                  search={this.search}
                  handleChange={this.handleChange}
                  query={this.state.query}
                />
                {/*The displaySearch attribute allows us to re-use the BookRow component
            due to its ability to render our page differently for search results.*/}
                <BookRow
                  myReads=""
                  shelfTitle="Search Results"
                  shelf={this.state.searchResults}
                  changeBookshelf={this.changeBookshelf}
                  displaySearch={true}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/my-reads"
            render={() => (
              <div>
                <BookRow
                  myReads="MyReads"
                  shelfTitle="Currently Reading"
                  shelf={this.state.currentlyReading}
                  changeBookshelf={this.changeBookshelf}
                  selectedValue="currentlyReading"
                />
                <BookRow
                  myReads=""
                  shelfTitle="Want To Read"
                  shelf={this.state.wantToRead}
                  changeBookshelf={this.changeBookshelf}
                  selectedValue="wantToRead"
                />
                <BookRow
                  myReads=""
                  shelfTitle="Read"
                  shelf={this.state.read}
                  changeBookshelf={this.changeBookshelf}
                  selectedValue="read"
                />
                <SearchButton resetSearch={this.resetSearch} />
              </div>
            )}
          />
          <Route render={() => <NoMatch />} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp4;
