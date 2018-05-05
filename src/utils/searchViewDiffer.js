export const searchResultsDiffer = (searchResults, kvs) =>
  searchResults.map(
    book =>
      kvs[book.id]
        ? kvs[book.id]
        : book.shelf
          ? { ...book, shelf: false }
          : book
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

export default searchViewDiffer;
