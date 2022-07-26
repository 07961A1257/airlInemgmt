import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './../NotFound';

it('Label Component', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
