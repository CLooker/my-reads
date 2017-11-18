import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
    searchResults: []
  }

  getShelfAndRender = () => {
      BooksAPI.getAll().then((booksReturn) => {
        let shelfTemp = [],
            currentlyReadingTemp = [],
            wantToReadTemp = [],
            readTemp = [];
        booksReturn.forEach(bookObj => {
          switch (bookObj.shelf) {
            case "currentlyReading":
              shelfTemp.push(bookObj);
              currentlyReadingTemp.push(bookObj);
              break;
            case "wantToRead":
              shelfTemp.push(bookObj);
              wantToReadTemp.push(bookObj);
              break;
            case "read":
              shelfTemp.push(bookObj);
              readTemp.push(bookObj);
              break;
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

  componentDidMount() {
    this.getShelfAndRender();
  }

  changeBookshelf = (e) => {
    BooksAPI.update( {id: e.currentTarget.getAttribute('data')}, e.target.value)
    .then((updatedShelf) => {
      let currentlyReadingTemp = [],
          wantToReadTemp = [],
          readTemp = [],
          shelfKeyValueStore = {};
      this.state.shelf.forEach((bookObj) => {
         shelfKeyValueStore[bookObj.id] = bookObj;
      });
      let bookIdMatrix = [
        updatedShelf.currentlyReading,
        updatedShelf.wantToRead,
        updatedShelf.read
      ];
      bookIdMatrix.forEach(
        (bookIdArr, index) => {
          switch(index) {
            case 0:
              bookIdArr.forEach(bookId => {
                currentlyReadingTemp.push(shelfKeyValueStore[bookId]);
              });
              break;
            case 1:
              bookIdArr.forEach(bookId => {
                wantToReadTemp.push(shelfKeyValueStore[bookId]);
              });
              break;
            case 2:
              bookIdArr.forEach(bookId => {
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
          case queryReturned !== undefined:
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
                selectedValue='none'
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
