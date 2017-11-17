import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookRow from './BookRow';
import SearchButton from './SearchButton';
import SearchBar from './SearchBar';
import './App.css';

class BooksApp4 extends Component {

  state = {
    shelf: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchState: false,
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksReturn) => {
      let shelfTemp = [],
          currentlyReadingTemp = [],
          wantToReadTemp = [],
          readTemp = [];
      booksReturn.map(bookObj => {
        switch (bookObj.shelf) {
          case "currentlyReading":
            shelfTemp.push(bookObj);
            return currentlyReadingTemp.push(bookObj);
          case "wantToRead":
            shelfTemp.push(bookObj);
            return wantToReadTemp.push(bookObj);
          case "read":
            shelfTemp.push(bookObj);
            return readTemp.push(bookObj);
          default:
            break;
        }
      });
      this.setState({
        shelf: shelfTemp,
        currentlyReading: currentlyReadingTemp,
        wantToRead: wantToReadTemp,
        read: readTemp
      });
    });
  }

  changeBookshelf = (e) => {
    BooksAPI.update( {id: e.currentTarget.getAttribute('data')}, e.target.value)
    .then((updatedShelf) => {
      let currentlyReadingTemp = [],
          wantToReadTemp = [],
          readTemp = [],
          shelfKeyValueStore = {};
      this.state.shelf.map((bookObj) => {
         shelfKeyValueStore[bookObj.id] = bookObj;
      });
      let bookIdMatrix = [
        updatedShelf.currentlyReading,
        updatedShelf.wantToRead,
        updatedShelf.read
      ];
      bookIdMatrix.map(
        (bookIdArr, index) => {
          switch(index) {
            case 0:
              bookIdArr.map(bookId => {
                currentlyReadingTemp.push(shelfKeyValueStore[bookId]);
              });
              break;
            case 1:
              bookIdArr.map(bookId => {
                wantToReadTemp.push(shelfKeyValueStore[bookId]);
              });
              break;
            case 2:
              bookIdArr.map(bookId => {
                readTemp.push(shelfKeyValueStore[bookId]);
              });
              break;
            default:
              break;
          }
        }
      );
      this.setState({
        currentlyReading: currentlyReadingTemp,
        wantToRead: wantToReadTemp,
        read: readTemp
      });
    });
  }

  addBook = () => {
    this.setState({searchState: true})
  }

  closeSearch = () => {
    this.setState({searchState: false})
  }

  search = (query) => {
    if (query) {
      BooksAPI.search(query).then(queryReturned => {
        if (queryReturned.error) {
          this.setState({searchResults: []});
        }
        else if (queryReturned !== undefined) {
          this.setState({searchResults: queryReturned});
        }
        else {
          this.setState({searchResults: []});
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
        {this.state.searchState ?
          (
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
                selectedValue='none'
              />
            </div>
          )
        :
          (
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
              <SearchButton addBook={this.addBook}/>
            </div>
          )
        }
      </div>
    )
  }
}

export default BooksApp4;
