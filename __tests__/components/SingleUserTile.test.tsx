import React from 'react';
import renderer from 'react-test-renderer';
import SingleUserTile from '../../src/components/SingleUserTile';

test('', () => {
  const singleUserTile = renderer.create(
    <SingleUserTile
      u={{
        uid: '',
        name: '',
        email: null,
        isGroup: false,
        members: null,
        adminId: null,
        createdAt: null,
      }}
    />,
  );
  expect(singleUserTile.toJSON()).toMatchSnapshot();
});
