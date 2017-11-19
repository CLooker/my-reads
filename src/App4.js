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
    // BooksApi.getAll returns an array
    // this block deals with that response
    if (Array.isArray(apiReturn)) {
      this.setState({
        // all of our books in one array
        // we will use it to build our key-value store, later
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
    // BooksApi.update returns an object
    // this block deals with that response
    else {
      // create an object whose keys are book Id's
      // and whose values are the entire book object related to that Id
      // BooksApi.update returns an object composed of arrays that contain bookId's
      // our key-value store allows us to directly grab book objects
      // instead of looping over apiReturn over and over and over
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

  // each book resides in an <li> that possesses a key whose value is that book's id
  // we are grabbing that id as well as the option-value selected
  // this info allows us to communicate to the api our book-shelf change
  changeBookshelf = (e) => {
    BooksAPI.update( {id: e.currentTarget.getAttribute('data')}, e.target.value)
    .then((apiReturn) => {
      this.setStateOnApiReturn(apiReturn);
    });
  }

  // when we click the back arrow on our search component
  closeSearch = function(){
    this.getShelfAndRender();
  }

  // without setting state here,
  // if we go back and forth between our root page and search
  // our previous search result would persist
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
            // this.setState({searchResults: queryReturnedUpdated});
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
            {/*The displaySearch attribute allows us to re-use the BookRow component
            due to its ability to render our page differently for search results.*/}
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
