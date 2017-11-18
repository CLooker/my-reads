import React from 'react';
import './App.css';

const BookRow = function(props) {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{props.myReads}</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.shelf.map(book => {
                    if (book.imageLinks) {
                      return (
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={props.changeBookshelf}
                                value={props.selectedValue}
                                data={book.id}
                              >
                                <option value="none" disabled>Move to...</option>
                                <option value=""></option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
                            {book.authors && book.authors.map((author)=> {
                              return (<div key={author + Math.random()}>{author}</div>)
                            })}
                          </div>
                        </div>
                      </li>
                      )
                    }
                    else {
                      return (
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(http://via.placeholder.com/128x193)`
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={ props.changeBookshelf }
                                value={props.selectedValue}
                                data={book.id}
                              >
                                <option value="none" disabled>Move to...</option>
                                <option value=""></option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
                      </li>
                      )
                    }
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
}

export default BookRow;
