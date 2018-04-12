import searchViewDiffer from '../../utils/searchViewDiffer';
import { searchResultsDiffer } from '../../utils/searchViewDiffer';

const book1 = {
  id: '123'
};

const book2 = {
  id: '456',
  shelf: 'wantToRead'
};

const book3 = {
  id: '789'
};

const prevState = {
  query: 'fake query',
  searchResults: []
};

const nextProps = {
  shelfKeyValueStore: {
    '123': {
      id: '123',
      shelf: 'currentlyReading'
    }
  }
};

describe('`SearchViewDiffer`', () => {
  it('should return the correct object', () => {
    const prevState = {
      query: 'fake query',
      searchResults: [
        {
          id: '123'
        }
      ]
    };

    const nextProps = {
      shelfKeyValueStore: {
        '123': {
          id: '123',
          shelf: 'currentlyReading'
        }
      }
    };

    const expected = {
      query: prevState.query,
      searchResults: [nextProps.shelfKeyValueStore['123']]
    };

    const actual = searchViewDiffer(nextProps, prevState);

    expect(actual).toEqual(expected);
  });
});

describe('`searchResultsDiffer`', () => {
  describe('code paths', () => {
    describe('`book` is in `kvs`', () => {
      it('should return the correct value', () => {
        const expected = [nextProps.shelfKeyValueStore['123']];
        const actual = searchResultsDiffer(
          prevState.searchResults.concat(book1),
          nextProps.shelfKeyValueStore
        );
        expect(actual).toEqual(expected);
      });
    });

    describe('`book` is not in `kvs`', () => {
      describe('code paths', () => {
        describe('`book.shelf` is truthy', () => {
          it('should return the correct object', () => {
            const expected = [
              {
                ...book2,
                shelf: false
              }
            ];

            const actual = searchResultsDiffer(
              prevState.searchResults.concat(book2),
              nextProps.shelfKeyValueStore
            );

            expect(actual).toEqual(expected);
          });
        });

        describe('`book.shelf` is falsy', () => {
          it('should return `book`', () => {
            const expected = [book3];
            const actual = searchResultsDiffer(
              prevState.searchResults.concat(book3),
              nextProps.shelfKeyValueStore
            );
            expect(actual).toEqual(expected);
          });
        });
      });
    });
  });
});
