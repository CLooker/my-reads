# MyReads Project
This is the final project for the React Fundamentals Course, which is a part of Udacity's React Nanodegree Program.

MyReads allows the user to manipulate three "bookshelves"; a "currently reading" shelf, a "want to read" shelf, and a "read" shelf. The user can search for new books to add, change the shelf a book is on, or remove a book from being a part of any shelf.

### Quickstart
Install the project dependencies using `npm install` or `yarn install`.
Get the project running with `npm start` or `yarn` while in the root directory.

Each book component has a button that exposes a dropdown menu that lists bookshelf options. The shelf that book is currently on will be highligted. Choosing any other shelf will move that book to the selected shelf.

Search for books by clicking the add button (bottom, right corner). A search bar will render. If you choose to add a book to a shelf, this will update the state of that shelf in real time. You can also return to the root directory and see your newly added books.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).