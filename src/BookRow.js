import React from 'react';
import Book from './Book';
import './App.css';

const BookRow = function(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{props.myReads}</h1>
      </div>
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">
            {props.shelfTitle}
          </h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.shelf.map(book=> {
                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      changeBookshelf={props.changeBookshelf}
                    />
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookRow;
