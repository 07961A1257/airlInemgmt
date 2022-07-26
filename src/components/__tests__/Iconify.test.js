import React from 'react';
import Iconify from '../Iconify';
import { shallow } from 'enzyme';

it('Iconify Component', () => {
  const wrapper = shallow(<Iconify />);
  expect(wrapper).toMatchSnapshot();
});
