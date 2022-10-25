import React from 'react';
import renderer from 'react-test-renderer';
import LikeButton from './LikeButton';

test('Like Button renders correctly', () => {
  const tree = renderer
    .create(
      <LikeButton
        item={{
          docId: '',
          text: '',
          createdAt: undefined,
          sentId: '',
          receivedId: '',
          groupId: null,
          likes: null,
        }}
        uid={''}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
