import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookRow from './BookRow';
import SearchButton from './SearchButton';
import SearchBar from './SearchBar';
import './App.css';

class BooksApp4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shelf: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      searchResults: []
    }
  }

  setStateOnApiReturn = (apiReturn) => {
    if (Array.isArray(apiReturn)) {
      this.setState({
        shelf: apiReturn.map(book => {
          return book;
        }),
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
    }
    else {
      let shelfKeyValueStore = {};
      this.state.shelf.forEach((bookObj) => {
        shelfKeyValueStore[bookObj.id] = bookObj;
      });
      this.setState({
        currentlyReading: apiReturn.currentlyReading.map(bookId => {
          return shelfKeyValueStore[bookId];
        }),
        wantToRead: apiReturn.wantToRead.map(bookId => {
          return shelfKeyValueStore[bookId];
        }),
        read: apiReturn.read.map(bookId => {
          return shelfKeyValueStore[bookId];
        })
      });
    }
  }

  getShelfAndRender = () => {
    BooksAPI.getAll().then(booksReturn => {
      this.setStateOnApiReturn(booksReturn);
    });
  }

  componentDidMount() {
    this.getShelfAndRender();
  }

  changeBookshelf = (e) => {
    BooksAPI.update( {id: e.currentTarget.getAttribute('data')}, e.target.value)
    .then((apiReturn) => {
      this.setStateOnApiReturn(apiReturn);
    });
  }

  closeSearch = function(){
    this.getShelfAndRender();
  }

  resetSearch = () => {
    this.setState({searchResults: []});
  }

  search = (query) => {
    if (query) {
      BooksAPI.search(query).then(queryReturned => {
        switch(queryReturned.error || queryReturned !== undefined) {
          case queryReturned.error:
            this.setState({searchResults: []});
            break;
          // After my first submission, the feedback was that
          // books that are in a user's bookshelf should not
          // show up in search results.
          // After my second submission, the feedback was the
          // the opposite. So, depending on what you think is
          // required, I left the code that would filter out
          // the user's books from showing up in the search
          // results.
          // The version you're interacting with is not removing
          // user book's from the serach results.
          case queryReturned !== undefined:
            // let shelfKeyValueStore = {},
            //     queryReturnedKeyValueStore = {},
            //     removeTheseBooks = [],
            //     queryReturnedUpdated = [];
            // this.state.shelf.forEach((bookObj) => {
            //    shelfKeyValueStore[bookObj.id] = bookObj;
            // });
            // queryReturned.forEach((bookObj) => {
            //   queryReturnedKeyValueStore[bookObj.id] = bookObj;
            // });
            // queryReturned.forEach((bookObj) => {
            //   if (shelfKeyValueStore[bookObj.id]) {
            //     removeTheseBooks.push(bookObj.id);
            //   }
            // });
            // removeTheseBooks.forEach(bookId => {
            //   delete queryReturnedKeyValueStore[bookId];
            // });
            // Object.keys(queryReturnedKeyValueStore).forEach(key => {
            //   queryReturnedUpdated.push(queryReturnedKeyValueStore[key]);
            // });
            this.setState({searchResults: queryReturned});
            break;
          default:
            this.setState({searchResults: []});
            break;
        }
      });
    }
    else {
      this.setState({searchResults: []});
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div>
            <SearchBar
              closeSearch={this.closeSearch}
              search={this.search}
            />
            <BookRow
              myReads=""
              shelfTitle="Search Results"
              shelf={this.state.searchResults}
              changeBookshelf={this.changeBookshelf}
              displaySearch={true}
              selectedValue=''
            />
          </div>
        )}/>
        <Route exact path="/" render={() => (
          <div>
            <BookRow
              myReads="MyReads"
              shelfTitle="Currently Reading"
              shelf={this.state.currentlyReading}
              changeBookshelf={this.changeBookshelf}
              selectedValue='currentlyReading'
            />
            <BookRow
              myReads=""
              shelfTitle="Want To Read"
              shelf={this.state.wantToRead}
              changeBookshelf={this.changeBookshelf}
              selectedValue='wantToRead'
            />
            <BookRow
              myReads=""
              shelfTitle="Read"
              shelf={this.state.read}
              changeBookshelf={this.changeBookshelf}
              selectedValue='read'
            />
            <SearchButton resetSearch={this.resetSearch}/>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp4;
