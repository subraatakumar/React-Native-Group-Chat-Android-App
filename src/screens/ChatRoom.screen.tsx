import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {MazicTextInput} from 'react-native-mazic-components';
import CustomButton from '../components/CustomButton';
import {Header} from 'react-native/Libraries/NewAppScreen';
import man1 from '../assets/img/man1.png';
import {ThemeColors} from '../settings/config';
import {shadows} from '../styles/shadows';
import LikeButton from '../components/LikeButton';
import {globalStyle} from '../styles/global';
import CustomTextInput from '../components/CustomTextInput';
const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [likes, setLikes] = useState(0);
  const navigation = useNavigation();

  const ImageHeader = props => {
    console.log(props);
    return (
      <View style={globalStyle.headerTitleContainer}>
        <Image source={man1} style={{width: 40, height: 40}} />
        <Text style={globalStyle.headerTitle}>Ramesh Jena</Text>
        {/* <Header {...props} style={{backgroundColor: 'transparent'}} /> */}
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <ImageHeader {...props} />,
      headerTitleStyle: {flex: 1, textAlign: 'center'},
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 10}}>
        <View style={style.receivedMessage}>
          <Text>Chat Message One</Text>
          <LikeButton
            value={likes}
            setValue={() => setLikes(prev => prev + 1)}
          />
          <View style={style.leftTriangle}></View>
        </View>
        <View style={style.sentMessage}>
          <Text>Chat Message Three</Text>
          <LikeButton disabled={true} position={'right'} setValue={() => {}} />
          <View style={style.rightTriangle}></View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 2,
          margin: 5,
          backgroundColor: '#fff',
          borderRadius: 20,
          ...shadows,
        }}>
        <View style={{flex: 1}}>
          <CustomTextInput
            placeholder="Write Message Here"
            value={message}
            setValue={setMessage}
            hideTitle={true}
            style={{borderRadius: 20}}
            w={'100%'}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <CustomButton
            onPressFn={undefined}
            bgc={ThemeColors.primary}
            rightIcon="send"
          />
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;

const style = StyleSheet.create({
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
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
    margin: 5,
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
