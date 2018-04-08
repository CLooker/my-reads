import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as BooksAPI from '../components/BooksAPI';
import App from '../components/App';

describe('App', () => {
  const books = [{ Author: 'Chad Looker' }];
  const response = JSON.stringify({ books });
  beforeEach(() => fetch.resetMocks());

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
  });
});
