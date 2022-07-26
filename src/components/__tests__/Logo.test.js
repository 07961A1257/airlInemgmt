import React from 'react';
import { shallow } from 'enzyme';
import Logo from './../Logo';

it('Label Component', () => {
  const wrapper = shallow(<Logo />);
  expect(wrapper).toMatchSnapshot();
});
