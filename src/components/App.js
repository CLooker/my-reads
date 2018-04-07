// import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI';
// import BookRow from './BookRow';
// import SearchButton from './SearchButton';
// import SearchBar from './SearchBar';
// import NoMatch from './NoMatch';
// import '../App.css';

// export default class App extends Component {
//   state = {
//     query: '',
//     shelf: [],
//     shelfKeyValueStore: {},
//     currentlyReading: [],
//     wantToRead: [],
//     read: [],
//     searchResults: []
//   };

//   componentDidMount() {
//     this.getShelfAndRender();
//   }

//   getShelfAndRender = () => BooksAPI.getAll().then(this.setStateOnApiReturn);

//   setStateOnApiReturn = apiReturn =>
//     Array.isArray(apiReturn)
//       ? this.buildState(apiReturn)
//       : this.getShelfAndRender();

//   buildState = apiReturn =>
//     this.setState({
//       shelf: apiReturn,
//       shelfKeyValueStore: this.buildKVS(apiReturn),
//       currentlyReading: this.buildShelfTypes(apiReturn, 'currentlyReading'),
//       wantToRead: this.buildShelfTypes(apiReturn, 'wantToRead'),
//       read: this.buildShelfTypes(apiReturn, 'read')
//     });

//   buildKVS = apiReturn =>
//     apiReturn.reduce(
//       (keyValueStore, book) => ({
//         ...keyValueStore,
//         [book.id]: book
//       }),
//       {}
//     );

//   buildShelfTypes = (apiReturn, type) =>
//     apiReturn.filter(({ shelf }) => shelf === type);

//   changeBookshelf = e => {
//     const id = e.currentTarget.getAttribute('data');
//     const newShelf = e.target.value.trim();

//     if (newShelf !== '') {
//       BooksAPI.update({ id }, newShelf).then(apiReturn => {
//         this.setStateOnApiReturn(apiReturn);
//         if (this.props.location.pathname.includes('search')) {
//           this.getShelfAndRender();
//           this.search(this.state.query);
//         }
//       });
//     }
//   };

//   closeSearch = () => this.getShelfAndRender();

//   resetSearch = () => this.setState({ searchResults: [] });

//   handleChange = event => {
//     this.setState({ query: event.target.value });
//     this.search(event.target.value);
//   };

//   search = query =>
//     query
//       ? BooksAPI.search(query).then(queryReturned => {
//           switch (queryReturned.error || queryReturned !== undefined) {
//             case queryReturned.error:
//               return this.resetSearch();
//             case queryReturned !== undefined:
//               return this.setState({
//                 searchResults: queryReturned.map(
//                   bookObj =>
//                     this.state.shelfKeyValueStore[bookObj.id] || bookObj
//                 )
//               });
//             default:
//               return this.resetSearch();
//           }
//         })
//       : this.resetSearch();

//   render() {
//     return (
//       <div className="app">
//         <Switch>
//           <Route
//             path="/my-reads/search"
//             render={routeProps => (
//               <div>
//                 <SearchBar
//                   closeSearch={this.closeSearch}
//                   search={this.search}
//                   handleChange={this.handleChange}
//                   query={this.state.query}
//                 />
//                 <BookRow
//                   myReads=""
//                   shelfTitle="Search Results"
//                   shelf={this.state.searchResults}
//                   changeBookshelf={this.changeBookshelf}
//                   displaySearch={true}
//                   {...routeProps}
//                 />
//               </div>
//             )}
//           />
//           <Route
//             exact
//             path="/my-reads"
//             render={routeProps => (
//               <div>
//                 <BookRow
//                   myReads="MyReads"
//                   shelfTitle="Currently Reading"
//                   shelf={this.state.currentlyReading}
//                   changeBookshelf={this.changeBookshelf}
//                   selectedValue="currentlyReading"
//                   {...routeProps}
//                 />
//                 <BookRow
//                   myReads=""
//                   shelfTitle="Want To Read"
//                   shelf={this.state.wantToRead}
//                   changeBookshelf={this.changeBookshelf}
//                   selectedValue="wantToRead"
//                   {...routeProps}
//                 />
//                 <BookRow
//                   myReads=""
//                   shelfTitle="Read"
//                   shelf={this.state.read}
//                   changeBookshelf={this.changeBookshelf}
//                   selectedValue="read"
//                   {...routeProps}
//                 />
//                 <SearchButton resetSearch={this.resetSearch} />
//               </div>
//             )}
//           />
//           <Route component={NoMatch} />
//         </Switch>
//       </div>
//     );
//   }
// }
