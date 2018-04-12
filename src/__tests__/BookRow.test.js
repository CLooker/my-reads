import React from 'react';
import { shallow } from 'enzyme';
import BookRow from '../components/BookRow';

describe('BookRow', () => {
  const componentProps = {
    shelfTitle: 'Currently Reading',
    shelf: [
      { id: '123', title: 'fake title' },
      { id: '456', title: 'fake title 2' }
    ],
    changeBookshelf: jest.fn()
  };

  let component;

  beforeEach(() => {
    component = shallow(<BookRow {...componentProps} />);
  });

  describe('initialization', () => {
    describe('code paths', () => {
      describe('`myReads` is a prop', () => {
        it('should render properly', () => {
          const localComponentProps = {
            ...componentProps,
            myReads: 'MyReads'
          };

          const localComponent = shallow(<BookRow {...localComponentProps} />);

          expect(localComponent).toMatchSnapshot();
        });
      });

      describe('`display is a truthy prop`', () => {
        it('should render properly', () => {
          const localComponentProps = {
            ...componentProps,
            displaySearch: true
          };

          const localComponent = shallow(<BookRow {...localComponentProps} />);

          expect(localComponent).toMatchSnapshot();
        });
      });

      describe('no optional props', () => {
        it('should render properly', () => {
          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
