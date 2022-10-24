import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 30,
    marginVertical: 15,
  },

  leftTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: '#FFF',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFF',
    borderLeftColor: 'transparent',
    left: -10,
  },

  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 15,
    marginLeft: 30,
    marginRight: 10,
  },

  rightTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: '#FFF',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: '#FFF',
    right: -10,
  },
});

export default style;
