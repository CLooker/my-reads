import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class SearchBar extends Component {

  state = {
    query: ''
  }

  componentDidMount() {
    this.setState({query: ''});
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
    this.props.search(event.target.value);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            onClick={this.props.closeSearch}
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBar;