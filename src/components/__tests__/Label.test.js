import React from 'react';
import { shallow } from 'enzyme';
import Label from '../Label';

it('Label Component', () => {
  const wrapper = shallow(<Label />);
  expect(wrapper).toMatchSnapshot();
});
