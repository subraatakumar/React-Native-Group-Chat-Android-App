import React from 'react';
import CustomButton from '../../src/components/CustomButton';
import renderer from 'react-test-renderer';

test('CustomButton renders correctly', () => {
  const customButton = renderer.create(
    <CustomButton title={''} onPressFn={undefined} />,
  );
  expect(customButton).toMatchSnapshot();
});
