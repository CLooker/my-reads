export const searchResultsDiffer = (searchResults, kvs) =>
  searchResults.map(
    book =>
      kvs[book.id]
        ? kvs[book.id]
        : book.shelf ? { ...book, shelf: false } : book
  );

const searchViewDiffer = (nextProps, prevState) => {
  return {
    query: prevState.query,
    searchResults: searchResultsDiffer(
      prevState.searchResults,
      nextProps.shelfKeyValueStore
    )
  };
};

// export const returnFormattedBook = book => ({ ...book, shelf: false });

// export const bookShelfChecker = book =>
//   book.shelf ? returnFormattedBook(book) : book;

// export const bookRecordExists = (kvs, book) => (kvs[book.id] ? true : false);

// export const searchResultsDiffer = (searchResults, kvs) =>
//   searchResults.map(
//     book =>
//       bookRecordExists(kvs, book) ? kvs[book.id] : bookShelfChecker(book)
//   );

// export const searchViewDiffer = (nextProps, prevState) => ({
//   query: prevState.query,
//   searchResults: searchResultsDiffer(
//     prevState.searchResults,
//     nextProps.shelfKeyValueStore
//   )
// });

export default searchViewDiffer;
