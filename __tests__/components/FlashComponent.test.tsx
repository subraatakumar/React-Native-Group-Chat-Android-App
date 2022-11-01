import React from 'react';
import renderer from 'react-test-renderer';
import FlashScreen from '../../src/components/FlashComponent';

test('Flash Component renders correctly', () => {
  const flashComponent = renderer.create(<FlashScreen />);
  expect(flashComponent).toMatchSnapshot();
});
