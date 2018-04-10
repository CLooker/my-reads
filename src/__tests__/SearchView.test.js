import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App';
import SearchView from '../components/SearchView';
import * as BooksAPI from '../components/BooksAPI';

describe('SearchView', () => {
  let searchViewProps, component;

  beforeEach(() => {
    searchViewProps = {
      shelfKeyValueStore: {
        def: {
          id: 'def',
          title: 'fake title 2',
          shelf: 'currentlyReading'
        }
      },
      setStateOnApiReturn: jest.fn(),
      getShelfAndRender: jest.fn()
    };
    component = shallow(<SearchView {...searchViewProps} />);
    fetch.resetMocks();
    jest.restoreAllMocks();
  });

  describe('initialization', () => {
    it('should render properly', () => {
      expect(component).toMatchSnapshot();
    });

    it('should have certain props', () => {
      const mountedComponent = mount(
        <MemoryRouter>
          <SearchView {...searchViewProps} />
        </MemoryRouter>
      );
      const expected = searchViewProps;
      const actual = mountedComponent.find('SearchView').props();
      expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('should have a certain state', () => {
      const expected = {
        query: '',
        searchResults: []
      };

      const actual = component.state();

      expect(actual).toEqual(expected);
    });

    describe('rendering children', () => {
      let el;

      beforeEach(() => {
        el = component.find('SearchBar');
      });
      describe('`SearchBar`', () => {
        it('should render `SearchBar`', () => {
          expect(el).toBeTruthy();
        });

        it('should pass certain props to `SearchBar`', () => {
          const expected = {
            handleChange: el.props().handleChange,
            query: ''
          };
          const actual = el.props();
          expect(actual).toEqual(expect.objectContaining(expected));
        });
      });

      describe('`BookRow`', () => {
        let el;

        beforeEach(() => {
          el = component.find('BookRow');
        });

        it('should render `BookRow`', () => {
          expect(el).toBeTruthy();
        });

        it('should pass certain props to `BookRow`', () => {
          const expected = {
            shelfTitle: 'Search Results',
            shelf: [],
            changeBookshelf: el.props().changeBookshelf,
            displaySearch: true
          };

          const actual = el.props();

          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe('methods', () => {
    describe('`resetSearch`', () => {
      it('should `setState` properly', () => {
        component.instance().setState({
          searchResults: ['hey', 'ho', "let's go"]
        });

        component.instance().resetSearch();

        const expected = {
          searchResults: []
        };

        const actual = component.state();

        expect(actual).toEqual(expect.objectContaining(expected));
      });
    });

    describe('`search`', () => {
      describe('code paths', () => {
        describe('arg exists', () => {
          describe('`BooksAPI.search` usage', () => {
            const query = 'Android';
            const returnValue = ['hey', 'ho', "let's go"];

            let spy;

            beforeEach(() => {
              BooksAPI.search = jest.fn(async () => await returnValue);
              spy = jest.spyOn(component.instance(), 'handleSearchReturn');
              component.instance().search(query);
            });

            it('should call `BooksAPI.search`', () => {
              expect(BooksAPI.search).toHaveBeenCalled();
            });

            it('should call `BooksAPI.search` with the correct arg', () => {
              const expected = query;
              const actual = BooksAPI.search.mock.calls[0][0];
              expect(actual).toBe(expected);
            });

            describe('`handleSearchReturn` usage', () => {
              it('should call `handleSearchReturn`', () => {
                expect(spy).toHaveBeenCalled();
              });

              it('should call `handleSearchReturn` with the correct arg', () => {
                const expected = returnValue;
                const actual = spy.mock.calls[0][0];
                expect(actual).toEqual(expected);
              });
            });
          });
        });

        describe('arg does not exist', () => {
          it('should call `resetSearch`', () => {
            component.instance().resetSearch = jest.fn();
            const query = '';
            component.instance().search(query);
            expect(component.instance().resetSearch).toHaveBeenCalled();
          });
        });
      });
    });

    describe('`handleSearchReturn`', () => {
      describe('code paths', () => {
        describe('arg is truthy', () => {
          it('should `setState` correctly', () => {
            const res = [
              {
                id: 'abc',
                title: 'fake title 1'
              },
              {
                id: 'def',
                title: 'fake title 2'
              }
            ];

            const expected = {
              searchResults: [
                {
                  id: 'abc',
                  title: 'fake title 1'
                },
                {
                  id: 'def',
                  title: 'fake title 2',
                  shelf: 'currentlyReading'
                }
              ]
            };

            component.instance().handleSearchReturn(res);
            const actual = component.state();
            expect(actual).toEqual(expect.objectContaining(expected));
          });
        });

        describe('arg is falsy', () => {
          it('should call `resetSearch`', () => {
            component.instance().resetSearch = jest.fn();
            const arg = '';
            component.instance().handleSearchReturn(arg);
            expect(component.instance().resetSearch).toHaveBeenCalled();
          });
        });
      });
    });

    describe('`changeBookshelf`', () => {
      const currentTarget = {
        getAttribute: jest.fn(() => '123')
      };

      const target = {
        value: {
          trim: jest.fn(() => 'read')
        }
      };

      beforeEach(() => {
        BooksAPI.update = jest.fn(async () => await []);
        component.instance().changeBookshelf({
          currentTarget,
          target
        });
      });

      describe('fns that should be called', () => {
        describe('`BooksAPI.update` usage', () => {
          it('should `BooksAPI.update`', () => {
            expect(BooksAPI.update).toHaveBeenCalled();
          });

          describe('args', () => {
            describe('first arg', () => {
              it('should be correct', () => {
                const expected = {
                  id: currentTarget.getAttribute()
                };
                const actual = BooksAPI.update.mock.calls[0][0];

                expect(actual).toEqual(expected);
              });
            });

            describe('second arg', () => {
              it('should be correct', () => {
                const expected = target.value.trim();
                const actual = BooksAPI.update.mock.calls[0][1];
                expect(actual).toBe(expected);
              });
            });
          });
        });

        it('should call `setStateOnApiReturn`', () => {
          expect(searchViewProps.setStateOnApiReturn).toHaveBeenCalled();
        });
      });
    });

    describe('`handleChange`', () => {
      let spy;

      const target = {
        value: 'Android'
      };

      const expected = target.value;

      beforeEach(() => {
        spy = jest.spyOn(component.instance(), 'search');
        component.instance().handleChange({ target });
      });

      it('should `setState` properly', () => {
        const actual = component.state().query;
        expect(actual).toBe(expected);
      });

      describe('`search` usage', () => {
        it('should call `search`', () => {
          expect(spy).toHaveBeenCalled();
        });

        it('should call `search` with correct arg', () => {
          const actual = spy.mock.calls[0][0];
          expect(actual).toBe(expected);
        });
      });
    });

    describe('`returnSearchBarProps`', () => {
      it('should return the correct object', () => {
        const expected = {
          handleChange: component.instance().handleChange,
          query: component.state().query
        };

        const actual = component.instance().returnSearchBarProps();

        expect(actual).toEqual(expected);
      });
    });

    describe('`returnBookRowProps`', () => {
      it('should return the correct object', () => {
        const expected = {
          shelfTitle: 'Search Results',
          shelf: component.state().searchResults,
          changeBookshelf: component.instance().changeBookshelf,
          displaySearch: true
        };

        const actual = component.instance().returnBookRowProps();

        expect(actual).toEqual(expected);
      });
    });
  });
});
