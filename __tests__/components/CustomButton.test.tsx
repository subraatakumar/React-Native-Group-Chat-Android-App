import React from 'react';
import CustomButton from '../../src/components/CustomButton';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';

test('CustomButton renders correctly', () => {
  const customButton = renderer.create(
    <CustomButton title={''} onPressFn={undefined} />,
  );
  expect(customButton).toMatchSnapshot();
});

test('CustomButton should contain title text', () => {
  const btn = render(<CustomButton title="My Button" onPressFn={() => {}} />);
  expect(btn.getAllByText('My Button')).toHaveLength(1);
});
