import React from 'react';

const convertToHttps = str =>
  str.includes('https') ? str : `${str.slice(0, 4)}s${str.slice(4)}`;

const checkForImageLinks = ({ imageLinks }) => (imageLinks ? true : false);

const returnImageAddress = book =>
  checkForImageLinks(book)
    ? convertToHttps(book.imageLinks.thumbnail)
    : encodeURI(
        `https://via.placeholder.com/128x193?text=${book.title.toUpperCase()}`
      );

const returnSelectValue = shelf => (shelf ? true : ' ');

const Book = ({ book, changeBookshelf, displaySearch }) => {
  const { title, id, shelf, authors } = book;
  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url(${returnImageAddress(book)})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={changeBookshelf}
              value={returnSelectValue(shelf)}
              data={id}
            >
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
          {authors &&
            authors.map(author => (
              <div key={`${author}${id}`.replace(/\s/g, '')}>{author}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
