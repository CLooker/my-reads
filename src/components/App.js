import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookRow from './BookRow';
import SearchButton from './SearchButton';
import SearchView from './SearchView';
import NoMatch from './NoMatch';
import '../App.css';

// fix http problem from thumbnail images
// maybe use loading spinner until bookshelf changes state

export default class App2 extends Component {
  state = {
    shelf: [],
    shelfKeyValueStore: {},
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.getShelfAndRender();
  }

  getShelfAndRender = () => BooksAPI.getAll().then(this.setStateOnApiReturn);

  setStateOnApiReturn = apiReturn =>
    Array.isArray(apiReturn)
      ? this.buildState(apiReturn)
      : this.getShelfAndRender();

  buildState = apiReturn =>
    this.setState({
      shelf: apiReturn,
      shelfKeyValueStore: this.buildKVS(apiReturn),
      currentlyReading: this.buildShelfTypes(apiReturn, 'currentlyReading'),
      wantToRead: this.buildShelfTypes(apiReturn, 'wantToRead'),
      read: this.buildShelfTypes(apiReturn, 'read')
    });

  buildKVS = apiReturn =>
    apiReturn
      .map(book => ({
        ...book,
        imageLinks: {
          smallThumbnail: `${book.imageLinks.smallThumbnail.slice(
            0,
            4
          )}s${book.imageLinks.smallThumbnail.slice(5)}`,
          thumbnail: `${book.imageLinks.thumbnail.slice(
            0,
            4
          )}s${book.imageLinks.thumbnail.slice(5)}`
        }
      }))
      .reduce(
        (keyValueStore, book) => ({
          ...keyValueStore,
          [book.id]: book
        }),
        {}
      );

  buildShelfTypes = (apiReturn, type) =>
    apiReturn.filter(({ shelf }) => shelf === type);

  changeBookshelf = e =>
    BooksAPI.update(
      { id: e.currentTarget.getAttribute('data') },
      e.target.value.trim()
    ).then(this.setStateOnApiReturn);

  returnSearchViewProps = routeProps => ({
    shelfKeyValueStore: this.state.shelfKeyValueStore,
    setStateOnApiReturn: this.setStateOnApiReturn,
    getShelfAndRender: this.getShelfAndRender,
    ...routeProps
  });

  returnMyReadsProps = (shelfTitle, routeProps) =>
    shelfTitle === 'Currently Reading'
      ? {
          myReads: 'MyReads',
          shelfTitle,
          shelf: this.state.currentlyReading,
          changeBookshelf: this.changeBookshelf,
          selectedValue: 'currentlyReading',
          ...routeProps
        }
      : shelfTitle === 'Want To Read'
        ? {
            shelfTitle,
            shelf: this.state.wantToRead,
            changeBookshelf: this.changeBookshelf,
            selectedValue: 'wantToRead',
            ...routeProps
          }
        : shelfTitle === 'Read' && {
            shelfTitle,
            shelf: this.state.read,
            changeBookshelf: this.changeBookshelf,
            selectedValue: 'read',
            ...routeProps
          };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/my-reads/search"
            render={routeProps => (
              <SearchView {...this.returnSearchViewProps(routeProps)} />
            )}
          />
          <Route
            exact
            path="/my-reads"
            render={routeProps => (
              <div>
                <BookRow
                  {...this.returnMyReadsProps('Currently Reading', routeProps)}
                />
                <BookRow
                  {...this.returnMyReadsProps('Want To Read', routeProps)}
                />
                <BookRow {...this.returnMyReadsProps('Read', routeProps)} />
                <SearchButton resetSearch={this.resetSearch} {...routeProps} />
              </div>
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
