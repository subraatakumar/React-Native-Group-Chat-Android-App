import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import CustomButton from '../components/CustomButton';
import people from '../assets/img/people.png';
import {Screens, ThemeColors} from '../settings/config';
import {shadows} from '../styles/shadows';
import LikeButton from '../components/LikeButton';
import {globalStyle} from '../styles/global';
import CustomTextInput from '../components/CustomTextInput';
import {
  increaseLike,
  setChatMessages,
  useAppDispatch,
  writeMessage,
} from '../redux/store';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {SingleChatMessageType} from '../settings/types';
import style from './ChatRoom.style';
import dateString from '../helpers/dateString';
import findMessageSentDetails from '../helpers/findMessageSentDetails';

const GroupChatRoom = () => {
  const [message, setMessage] = useState('');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {u} = useRoute().params;
  const {user} = useSelector((state: any) => state.userReducer);
  const {chatMessages} = useSelector((state: any) => state.chatMessageReducer);

  const ImageHeader = (props: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Screens.VIEWGROUPMEMBERS, {
            members: u.members,
            uid: user.uid,
          });
        }}>
        <View style={globalStyle.headerTitleContainer}>
          <Image source={people} style={{width: 40, height: 40}} />
          <Text style={globalStyle.headerTitle}>{u.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <ImageHeader {...props} />,
      headerTitleStyle: {flex: 1, textAlign: 'center'},
    });
  }, [u]);

  useEffect(() => {
    const firestoremessagecollection = firestore()
      .collection('Messages')
      .where('groupId', 'in', [u.uid]);

    return firestoremessagecollection.onSnapshot(querySnapshot => {
      if (querySnapshot !== null) {
        let result: SingleChatMessageType[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          result.push({
            docId: documentSnapshot.id,
            ...data,
          });
        });
        result.sort((a, b) => a.createdAt - b.createdAt);
        dispatch(setChatMessages(result));
      }
    });
  }, []);

  const sendMessage = () => {
    if (message !== '') {
      dispatch(
        writeMessage({
          text: message,
          receivedId: u.uid,
          sentId: user.uid,
          createdAt: Date.now(),
          groupId: u.uid,
          likes: [],
        }),
      );
      setMessage('');
    }
  };

  const SingleChatMessage = ({item}) => {
    const increaseLikeByOne = () => {
      if (!(item.likes?.includes(user.uid) || item.sentId === user.uid)) {
        dispatch(increaseLike({item, uid: user.uid}));
      }
    };
    return item.sentId === user.uid ? (
      <View style={style.sentMessage}>
        <Text>{item.text}</Text>
        <LikeButton
          disabled={true}
          position={'right'}
          item={item}
          uid={user.uid}
          setValue={increaseLikeByOne}
        />
        <View style={style.rightTriangle}></View>
      </View>
    ) : (
      <View style={style.receivedMessage}>
        <Text style={{fontSize: 10, marginTop: -10, textAlign: 'right'}}>
          {findMessageSentDetails(JSON.parse(u.members), item.sentId) +
            ' on ' +
            dateString(item.createdAt)}
        </Text>
        <Text>{item.text}</Text>
        <LikeButton item={item} uid={user.uid} setValue={increaseLikeByOne} />
        <View style={style.leftTriangle}></View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, margin: 15}}>
        <FlatList
          data={chatMessages}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
          renderItem={item => <SingleChatMessage item={item.item} />}
        />
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
            value={message}
            setValue={setMessage}
            placeholder="Write Message Here"
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

export default GroupChatRoom;
