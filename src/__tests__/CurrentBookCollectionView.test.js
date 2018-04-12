import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import App from '../components/App';
import CurrentBookCollectionView from '../components/CurrentBookCollectionView';

describe('CurrentBookCollectionView', () => {
  const books = [{ Author: 'Chad Looker' }];
  const response = JSON.stringify({ books });

  let mountedApp, component;

  beforeEach(() => {
    fetch.once(response);

    mountedApp = mount(
      <MemoryRouter initialEntries={['/my-reads']}>
        <App />
      </MemoryRouter>
    );

    component = mountedApp.find('CurrentBookCollectionView');
  });

  describe('initialization', () => {
    it('should have certain props', () => {
      const expectedKeys = [
        'returnMyReadsProps',
        'match',
        'location',
        'history',
        'staticContext'
      ];

      const actual = Object.keys(component.props());

      expectedKeys.forEach(key => {
        const match = actual.find(k => k === key);
        expect(match).toBeTruthy();
      });
    });

    describe('rendering children', () => {
      describe('`BookRow`', () => {
        it('should render three `BookRow` components', () => {
          const expected = 3;
          const actual = component.find('BookRow').length;
          expect(actual).toBe(expected);
        });

        describe('props passed to each child', () => {
          let app, bookRow;

          beforeEach(() => {
            app = mountedApp.find('App').instance();
            bookRow = component.find('BookRow');
          });

          describe('first child', () => {
            it('should have the correct props', () => {
              const expected = app.returnMyReadsProps('Currently Reading');

              const actual = bookRow.first().props();

              expect(actual).toEqual(expect.objectContaining(expected));
            });
          });

          describe('second child', () => {
            it('should have the correct props', () => {
              const expected = app.returnMyReadsProps('Want To Read');

              const actual = component
                .find('BookRow')
                .at(1)
                .props();

              expect(actual).toEqual(expect.objectContaining(expected));
            });
          });

          describe('third child', () => {
            it('should have the correct props', () => {
              const expected = mountedApp
                .find('App')
                .instance()
                .returnMyReadsProps('Read');

              const actual = component
                .find('BookRow')
                .last()
                .props();

              expect(actual).toEqual(expect.objectContaining(expected));
            });
          });
        });
      });
    });

    describe('`SearchButton`', () => {
      let searchButton;

      beforeEach(() => (searchButton = component.find('SearchButton')));

      it('should render a `SearchButton` component', () => {
        expect(searchButton).toExist();
      });

      it('should have certain props', () => {
        const expected = {
          match: expect.any(Object),
          location: expect.any(Object),
          history: expect.any(Object),
          staticContext: undefined
        };

        const actual = searchButton.props();

        expect(actual).toEqual(expected);
      });
    });
  });
});
