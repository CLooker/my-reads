import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchView from './SearchView';
import CurrentBookCollectionView from './CurrentBookCollectionView';
import NoMatch from './NoMatch';
import '../App.css';

export default class App extends Component {
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

  getShelfAndRender() {
    BooksAPI.getAll().then(this.setStateOnApiReturn);
  }

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
    apiReturn.reduce(
      (keyValueStore, book) => ({
        ...keyValueStore,
        [book.id]: book
      }),
      {}
    );

  buildShelfTypes = (apiReturn, type) =>
    apiReturn.filter(({ shelf }) => shelf === type);

  changeBookshelf = e =>
    console.log('changeBookshelf called') ||
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

  returnCurrentBookCollectionViewProps = routeProps => ({
    returnMyReadsProps: this.returnMyReadsProps,
    ...routeProps
  });

  render() {
    return (
      <Router>
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
                <CurrentBookCollectionView
                  {...this.returnCurrentBookCollectionViewProps(routeProps)}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
