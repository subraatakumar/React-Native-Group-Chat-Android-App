import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, FlatList} from 'react-native';
import {MazicTextInput} from 'react-native-mazic-components';
import CustomButton from '../components/CustomButton';
import {Header} from 'react-native/Libraries/NewAppScreen';
import man1 from '../assets/img/man1.png';
import {ThemeColors} from '../settings/config';
import {shadows} from '../styles/shadows';
import LikeButton from '../components/LikeButton';
import {globalStyle} from '../styles/global';
import CustomTextInput from '../components/CustomTextInput';
import {setChatMessages, useAppDispatch, writeMessage} from '../redux/store';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {SingleChatMessageType} from '../settings/types';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [likes, setLikes] = useState(0);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {u} = useRoute().params;
  const {user} = useSelector((state: any) => state.userReducer);
  const {chatMessages, writeMessageStatus, writeMessageError} = useSelector(
    (state: any) => state.chatMessageReducer,
  );

  console.log(u, writeMessageStatus, writeMessageError);

  const ImageHeader = (props: any) => {
    console.log(props);
    return (
      <View style={globalStyle.headerTitleContainer}>
        <Image source={man1} style={{width: 40, height: 40}} />
        <Text style={globalStyle.headerTitle}>{u.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <ImageHeader {...props} />,
      headerTitleStyle: {flex: 1, textAlign: 'center'},
    });
  }, [u]);

  useEffect(() => {
    const firestoremessagecollection = firestore().collection('Messages');

    return firestoremessagecollection.onSnapshot(querySnapshot => {
      if (querySnapshot == null) {
        //reject('Error receiving data');
      } else {
        let result: SingleChatMessageType[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          result.push(data);
        });
        //console.log(result);
        result.sort((a, b) => a.createdAt - b.createdAt);
        dispatch(setChatMessages(result));
      }
    });
  }, []);

  const sendMessage = () => {
    // console.log({
    //   text: message,
    //   receivedId: u.uid,
    //   sentId: user.uid,
    //   createdAt: Date.now(),
    //   groupId: null,
    //   likes: [],
    // });
    dispatch(
      writeMessage({
        text: message,
        receivedId: u.uid,
        sentId: user.uid,
        createdAt: Date.now(),
        groupId: null,
        likes: [],
      }),
    );
  };

  const SingleChatMessage = ({item}) =>
    item.sentId === user.uid ? (
      <View style={style.sentMessage}>
        <Text>{item.text}</Text>
        <LikeButton disabled={true} position={'right'} setValue={() => {}} />
        <View style={style.rightTriangle}></View>
      </View>
    ) : (
      <View style={style.receivedMessage}>
        <Text>{item.text}</Text>
        <LikeButton value={likes} setValue={() => setLikes(prev => prev + 1)} />
        <View style={style.leftTriangle}></View>
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 10}}>
        <FlatList
          data={chatMessages}
          renderItem={item => <SingleChatMessage item={item.item} />}
        />
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
            onPressFn={sendMessage}
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
