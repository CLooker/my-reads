import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from '../components/NoMatch';

describe('NoMatch', () => {
  it('should render properly', () => {
    const component = shallow(<NoMatch />);
    expect(component).toMatchSnapshot();
  });
});
