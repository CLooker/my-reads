import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as BooksAPI from '../components/BooksAPI';
import App from '../components/App';

describe('App', () => {
  const books = [{ Author: 'Chad Looker' }];
  const response = JSON.stringify({ books });
  beforeEach(() => {
    fetch.resetMocks();
    jest.restoreAllMocks();
  });

  describe('`componentDidMount`', () => {
    it('should call the correct fn', () => {
      const spy = jest.spyOn(App.prototype, 'getShelfAndRender');
      fetch.once(response);
      const mountedComponent = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  describe('initialization', () => {
    it('should render correctly', () => {
      expect(component).toMatchSnapshot();
    });

    it('should have a particular state', () => {
      const actual = component.state();
      const expected = {
        shelf: [],
        shelfKeyValueStore: {},
        currentlyReading: [],
        wantToRead: [],
        read: []
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('rendered components based on pathname', () => {
    describe('path === /my-reads', () => {
      const path = '/my-reads';

      let mountedComponent, app, el;

      beforeEach(() => {
        mountedComponent = mount(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        );

        app = mountedComponent.find('App').instance();

        el = mountedComponent.find('CurrentBookCollectionView');
      });

      it('should render `CurrentBookCollectionView`', () => {
        const expected = true;
        const actual = el.length > 0;

        expect(actual).toBe(expected);
      });

      it('should pass the correct props', () => {
        const expected = app.returnCurrentBookCollectionViewProps({});

        const actual = el.props();

        expect(actual).toEqual(expect.objectContaining(expected));
      });
    });

    describe('path === /my-reads/search', () => {
      const path = '/my-reads/search';

      let mountedComponent, app, el;

      beforeEach(() => {
        mountedComponent = mount(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        );

        app = mountedComponent.find('App').instance();

        el = mountedComponent.find('SearchView');
      });

      it('should render `SearchView`', () => {
        const expected = true;
        const actual = el.length > 0;

        expect(actual).toBe(expected);
      });

      it('should pass the correct props', () => {
        const expected = app.returnSearchViewProps({});

        const actual = el.props();

        expect(actual).toEqual(expect.objectContaining(expected));
      });
    });

    describe('path has no match', () => {
      const path = `${Math.random()}${Math.random()}${Math.random()}`;

      let mountedComponent, app, el;

      beforeEach(() => {
        mountedComponent = mount(
          <MemoryRouter initialEntries={[path]}>
            <App />
          </MemoryRouter>
        );

        app = mountedComponent.find('App').instance();

        el = mountedComponent.find('NoMatch');
      });

      it('should render `NoMatch`', () => {
        const expected = true;
        const actual = el.length > 0;

        expect(actual).toBe(expected);
      });
    });
  });

  describe('methods', () => {
    let mountedComponent, app;
    BooksAPI.getAll = jest.fn(async () => await []);

    beforeEach(() => {
      mountedComponent = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      app = mountedComponent.find('App').instance();
    });

    describe('`getShelfAndRender`', () => {
      it('should call the correct fn', () => {
        // maintain referential identity to prevent test pollution
        const localFn = jest.fn(async () => await []);
        BooksAPI.getAll = localFn;

        app.getShelfAndRender();
        expect(BooksAPI.getAll).toHaveBeenCalled();
      });
    });

    describe('`setStateOnApiReturn`', () => {
      describe('code paths', () => {
        describe('arg is not an array', () => {
          it('should call `getShelfAndRender`', () => {
            app.getShelfAndRender = jest.fn();

            const arg = '';
            app.setStateOnApiReturn(arg);

            expect(app.getShelfAndRender).toHaveBeenCalled();
          });
        });

        describe('arg is an array', () => {
          describe('`buildState` usage', () => {
            const arg = [];

            beforeEach(() => {
              app.buildState = jest.fn();
              app.setStateOnApiReturn(arg);
            });

            it('should call `buildState`', () => {
              expect(app.buildState).toHaveBeenCalled();
            });

            it('should pass `buildState` the correct arg', () => {
              const expected = arg;
              const actual = app.buildState.mock.calls[0][0];

              expect(actual).toBe(expected);
            });
          });
        });
      });
    });

    describe('`buildState`', () => {
      it('should call `setState`', () => {
        app.setState = jest.fn();
        app.buildState([]);
        expect(app.setState).toHaveBeenCalled();
      });
    });

    describe('`buildKVS`', () => {
      it('should return an object with the appropriate shape', () => {
        const book1 = {
          id: 'abc',
          title: 'fake title 1'
        };

        const book2 = {
          id: 'def',
          title: 'fake title 2'
        };

        const arg = [book1, book2];

        const expected = {
          [book1.id]: book1,
          [book2.id]: book2
        };
        const actual = app.buildKVS(arg);
        expect(actual).toEqual(expected);
      });
    });

    describe('`buildShelfTypes`', () => {
      const book1 = {
        title: 'book1 title',
        shelf: 'currentlyReading'
      };

      const book2 = {
        title: 'book2 title',
        shelf: 'wantToRead'
      };

      const book3 = {
        title: 'book3 title',
        shelf: 'read'
      };

      const arg = [book1, book2, book3];

      describe('code paths', () => {
        describe('`type` is "currentlyReading"', () => {
          it('should return the appropriate array', () => {
            const expected = [book1];

            const type = 'currentlyReading';
            const actual = app.buildShelfTypes(arg, type);

            expect(actual).toEqual(expected);
          });
        });

        describe('`type` is "wantToRead"', () => {
          it('should return the appropriate array', () => {
            const expected = [book2];

            const type = 'wantToRead';
            const actual = app.buildShelfTypes(arg, type);

            expect(actual).toEqual(expected);
          });
        });

        describe('`type` is "read"', () => {
          it('should return the appropriate array', () => {
            const expected = [book3];

            const type = 'read';
            const actual = app.buildShelfTypes(arg, type);

            expect(actual).toEqual(expected);
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
        app.setStateOnApiReturn = jest.fn();

        app.changeBookshelf({
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
          expect(app.setStateOnApiReturn).toHaveBeenCalled();
        });
      });
    });

    describe('`returnSearchViewProps`', () => {
      it('should return the correct object', () => {
        const routeProps = {
          match: 'a bunch of fake stuff'
        };

        const shelfKeyValueStore = {
          '123': {
            id: '123',
            title: 'first fake title'
          },
          '456': {
            id: '456',
            title: 'second fake title'
          }
        };

        const expected = {
          shelfKeyValueStore,
          setStateOnApiReturn: app.setStateOnApiReturn,
          getShelfAndRender: app.getShelfAndRender,
          ...routeProps
        };

        app.setState({ shelfKeyValueStore });
        const actual = app.returnSearchViewProps(routeProps);

        expect(actual).toEqual(expected);
      });
    });

    describe('`returnMyReadsProps`', () => {
      const routeProps = {
        match: 'a bunch of fake stuff'
      };
      describe('code paths', () => {
        describe('`shelfTitle === "Currently Reading"`', () => {
          it('should return the correct object', () => {
            const shelfTitle = 'Currently Reading';
            const currentlyReading = ['book1', 'book2'];

            const expected = {
              myReads: 'MyReads',
              shelfTitle,
              shelf: currentlyReading,
              changeBookshelf: app.changeBookshelf,
              selectedValue: 'currentlyReading',
              ...routeProps
            };

            app.setState({ currentlyReading });
            const actual = app.returnMyReadsProps(shelfTitle, routeProps);

            expect(actual).toEqual(expected);
          });
        });

        describe('`shelfTitle === "Want To Read"`', () => {
          it('should return the correct object', () => {
            const shelfTitle = 'Want To Read';
            const wantToRead = ['book3', 'book4'];

            const expected = {
              shelfTitle,
              shelf: wantToRead,
              changeBookshelf: app.changeBookshelf,
              selectedValue: 'wantToRead',
              ...routeProps
            };

            app.setState({ wantToRead });
            const actual = app.returnMyReadsProps(shelfTitle, routeProps);

            expect(actual).toEqual(expected);
          });
        });

        describe('`shelfTitle === "Read"`', () => {
          it('should return the correct object', () => {
            const shelfTitle = 'Read';
            const read = ['book5', 'book6'];

            const expected = {
              shelfTitle,
              shelf: read,
              changeBookshelf: app.changeBookshelf,
              selectedValue: 'read',
              ...routeProps
            };

            app.setState({ read });
            const actual = app.returnMyReadsProps(shelfTitle, routeProps);

            expect(actual).toEqual(expected);
          });
        });
      });
    });

    describe('`returnCurrentBookCollectionViewProps`', () => {
      it('should return the correct object', () => {
        const routeProps = {
          match: 'a bunch of fake props'
        };

        const expected = {
          returnMyReadsProps: app.returnMyReadsProps,
          ...routeProps
        };

        const actual = app.returnCurrentBookCollectionViewProps(routeProps);

        expect(actual).toEqual(expected);
      });
    });
  });
});
