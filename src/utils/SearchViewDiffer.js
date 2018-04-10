const SearchViewDiffer = (nextProps, prevState) => {
  let flag = false;
  const newSearchResults = Object.keys(nextProps.shelfKeyValueStore)
    .map(key => nextProps.shelfKeyValueStore[key])
    .map(book => {
      const target = book.id;
      const match = prevState.searchResults.find(({ id }) => id === target);
      if (match) {
        if (match.shelf !== target.shelf) {
          flag = true;
        }
      }
      return book;
    });

  if (flag === true) {
    return {
      query: prevState.query,
      searchResults: prevState.searchResults.map(book => {
        const target = book.id;
        const newVersion = newSearchResults.find(({ id }) => id === target);
        if (newVersion) {
          return newVersion;
        } else {
          return book;
        }
      })
    };
  } else {
    return null;
  }
};

export default SearchViewDiffer;
