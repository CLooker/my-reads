import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const componentProps = {
    handleChange: jest.fn()
  };
  describe('code paths', () => {
    describe('`query` prop', () => {
      describe('`query` is provided', () => {
        it('should render correctly', () => {
          const localComponentProps = {
            ...componentProps,
            query: 'fake query'
          };

          const component = shallow(<SearchBar {...localComponentProps} />);

          expect(component).toMatchSnapshot();
        });
      });

      describe('`query` is not provided', () => {
        it('should render correctly', () => {
          const component = shallow(<SearchBar {...componentProps} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
