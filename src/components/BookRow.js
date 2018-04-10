import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookRow = ({
  myReads,
  shelfTitle,
  shelf,
  changeBookshelf,
  displaySearch
}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>{myReads}</h1>
    </div>
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeBookshelf={changeBookshelf}
                  displaySearch={displaySearch}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </div>
);

BookRow.propTypes = {
  myReads: PropTypes.string,
  shelfTitle: PropTypes.string.isRequired,
  shelf: PropTypes.array.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
  displaySearch: PropTypes.bool
};

export default BookRow;
