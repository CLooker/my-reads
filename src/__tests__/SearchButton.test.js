import React from 'react';
import { shallow } from 'enzyme';
import SearchButton from '../components/SearchButton';

describe('SearchButton', () => {
  it('should render correctly', () => {
    const componentProps = {
      match: {
        path: 'my-reads'
      }
    };

    const component = shallow(<SearchButton {...componentProps} />);

    expect(component).toMatchSnapshot();
  });
});
