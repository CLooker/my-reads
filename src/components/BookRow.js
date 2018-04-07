import React from 'react';
import Book from './Book';

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

export default BookRow;
