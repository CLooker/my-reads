import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App';
import SearchView from '../components/SearchView';

describe('SearchView', () => {
  // const path = '/my-reads/search';

  // let mountedComponent, searchView;

  // beforeEach(() => {
  //   fetch.resetMocks();
  //   jest.restoreAllMocks();

  //   const books = [{ Author: 'Chad Looker' }];
  //   const response = JSON.stringify({ books });
  //   fetch.once(response);

  //   mountedComponent = mount(
  //     <MemoryRouter initialEntries={[path]}>
  //       <App />
  //     </MemoryRouter>
  //   );

  //   searchView = mountedComponent.find('SearchView');
  // });

  const SearchViewProps = {
    shelfKeyValueStore: {},
    setStateOnApiReturn: jest.fn(),
    getShelfAndRender: jest.fn()
  };

  let component;

  beforeEach(() => (component = shallow(<SearchView {...SearchViewProps} />)));

  describe('initialization', () => {
    it('should render properly', () => {
      expect(component).toMatchSnapshot();
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

  describe('methods', () => {});
});
