import {useSelector} from 'react-redux';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// jest.mock('@react-native-firebase/auth', () => ({
//   GoogleAuthProvider: {
//     credential: jest.fn().mockReturnValue('123'),
//   },
// }));
jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    firebaseConfig: jest.fn().mockReturnValue({}),
    auth: jest.fn().mockReturnValue({
      currentUser: {
        uid: '123456789',
        email: 'ganesh@gmail.com',
        displayName: 'Ganesh',
      },
    }),
    default: jest.fn().mockReturnValue({
      currentUser: {
        uid: '123456789',
        email: 'ganesh@gmail.com',
        displayName: 'Ganesh',
      },
      signInWithEmailAndPassword: jest.fn().mockReturnValue({
        currentUser: {
          uid: '123456789',
          email: 'ganesh@gmail.com',
          displayName: 'Ganesh',
        },
      }),
    }),
  };
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockReturnValue({}),
}));

/**
 * Firebase Auth Module
 */
// jest.mock('firebase/auth', () => {
//   const authInstance = {
//     // while handshaking with the Firebase Auth servers, currentUser
//     // is null, regardless if someone is logged in or not.
//     currentUser: null,
//   };

//   const mockedUserInfo = Object.freeze({
//     // force read-only
//     // mocked user info here - display name, email, etc
//     email: 'ganesh@gmail.com',
//     uid: '123456789',
//     displayName: 'Ganesh',
//   });

//   // container for attached callbacks and state variables
//   const authChangeCallbacks = [];
//   let authCurrentUserInfo = mockedUserInfo;
//   let authTimer = null;
//   let authTimerCompleted = false;

//   // invoke all callbacks with current data
//   const fireOnChangeCallbacks = (authMock, callbacks) => {
//     authMock.currentUser = authCurrentUserInfo;
//     callbacks.forEach(cb => {
//       try {
//         cb(mockedUserInfo); // invoke any active listeners
//       } catch (err) {
//         console.error('Error invoking callback', err);
//       }
//     });
//     authTimerCompleted = true;
//   };

//   authInstance.signOut = () => {
//     // signInWithX will look similar to this
//     authCurrentUserInfo = null;
//     fireOnChangeCallbacks();
//   };

//   return {
//     getAuth: jest.fn(() => authInstance),
//     onAuthStateChanged: jest.fn((authMock, onChangeCallback) => {
//       if (!authTimer) {
//         // increase this delay to emulate slower connections
//         authTimer = setTimeout(fireOnChangeCallbacks, 2000);
//       }

//       callbacks.push(onChangeCallback);
//       const unsubscriber = () => {
//         const foundIndex = callbacks.indexOf(onChangeCallback);
//         if (foundIndex > -1) callbacks.splice(foundIndex, 1);
//       };

//       if (authTimerCompleted) {
//         // auth is "resolved" already, fire callback immediately
//         onChangeCallback(mockedUserInfo);
//       }

//       return unsubscriber;
//     }),
//   };
// });
