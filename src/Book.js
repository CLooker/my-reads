import React from 'react';
import './App.css';

const Book = props => {
  const book = props.book;
  return (
    <div>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(
                  ${(book.imageLinks && book.imageLinks.thumbnail) ||
                    encodeURI(
                      `https://via.placeholder.com/128x193?text=${book.title.toUpperCase()}`
                    )}
                )`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={props.changeBookshelf}
              value={book.selectedValue || ' '}
              data={book.id}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {props.displaySearch && <option value=" " />}
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {book.shelf && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors &&
            book.authors.map(author => {
              return (
                <div key={`${author}${book.id}`.replace(/\s/g, '')}>
                  {author}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Book;
