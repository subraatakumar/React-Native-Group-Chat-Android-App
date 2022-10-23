import {Dimensions} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const Element = {
  height: deviceHeight > 600 ? 40 : 30,
  width: deviceWidth > 350 ? 250 : 200,
};
console.log('Width, height : ', deviceWidth, deviceHeight);

export const AppConfig = {
  title: 'Group Chat',
};

export const ThemeColors = {
  primary: 'rgba(0,128,105,1)',
  background: '#f1f1f1',
  card: 'rgba(0,128,105,1)',
  text: 'white',
  border: 'rgba(0,128,105,1)',
  notification: 'rgba(0,128,105,1)',
  tileBackColor: '#FFF',
  black: '#000',
  disabled: 'rgba(0,0,0,0.3)',
  warning: 'rgb(255, 153, 51)',
  danger: 'red',
};

export const fontSize = {
  s: 12,
  m: 15,
  l: 18,
  xl: 22,
  xxl: 25,
  xxxl: 28,
};

export const Constants = {
  LOADING: 'loading',
  IDLE: 'idle',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

export const Screens = {
  SIGNUP: 'SignUp',
  LOGIN: 'Login',
  HOME: 'Home',
  CREATEGROUP: 'CreateGroup',
  CHATROOM: 'ChatRoom',
};
