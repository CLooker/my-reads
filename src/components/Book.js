import React, { Component } from 'react';

export default class Book extends Component {
  returnImageAddress = book =>
    this.checkForImageLinks(book)
      ? this.convertToHttps(book.imageLinks.thumbnail)
      : this.returnPlaceHolder(book.title);

  checkForImageLinks = ({ imageLinks }) => (imageLinks ? true : false);

  convertToHttps = str =>
    str.includes('https') ? str : `${str.slice(0, 4)}s${str.slice(4)}`;

  returnPlaceHolder = title =>
    encodeURI(
      `https://via.placeholder.com/128x193/000000/ffffff?text=${this.checkForTitleLength(
        title
      )}`
    );

  checkForTitleLength = title =>
    title.length <= 10
      ? title.toUpperCase()
      : `${title.toUpperCase().slice(0, 9)}...`;

  returnSelectValue = shelf => (shelf ? shelf : ' ');

  checkForAuthors = (authors, id) =>
    authors && this.returnAuthorsEl(authors, id);

  returnAuthorsEl = (authors, id) =>
    authors.map(author => (
      <div key={`${author}${id}`.replace(/\s/g, '')}>{author}</div>
    ));

  render() {
    const { book, changeBookshelf, displaySearch } = this.props;
    const { title, id, shelf, authors } = book;
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                backgroundImage: `url(${this.returnImageAddress(book)})`
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={changeBookshelf} value={shelf || ' '} data={id}>
                <option value="none" disabled>
                  Move to...
                </option>
                {displaySearch && <option value=" " disabled />}
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                {shelf && <option value="none">None</option>}
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {this.checkForAuthors(authors, id)}
          </div>
        </div>
      </div>
    );
  }
}
