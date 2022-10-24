/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import auth from '@react-native-firebase/auth'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


auth().signInWithEmailAndPassword("ganesh@gmail.com", "password");

it('renders correctly', () => {
  renderer.create(<App />);
});
