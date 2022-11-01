import React from 'react';
import renderer from 'react-test-renderer';
import Logo from '../../src/components/Logo';

test('Logo renders successfully', () => {
  const logo = renderer.create(<Logo />);
  expect(logo.toJSON()).toMatchSnapshot();
});
