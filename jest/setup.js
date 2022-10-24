jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// jest.mock('@react-native-firebase/auth', () => ({
//   GoogleAuthProvider: {
//     credential: jest.fn().mockReturnValue('123'),
//   },
// }));
jest.mock('@react-native-firebase/auth', () => {
  return {
    auth: jest.fn(() => {
      currentUser: {
        uid: '123';
      }
    }),
  };
});
