import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, ChatRoom, CreateGroup, Login, SignUp} from '../screens';
import {Screens, ThemeColors} from '../settings/config';
import GroupChatRoom from '../screens/GroupChatRoom.screen';
import ViewGroupMembers from '../screens/ViewGroupMembers.screen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...ThemeColors,
  },
};

const StackNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name={Screens.CHATROOM}
          component={ChatRoom}
          options={{title: 'Chat Room'}}
        />
        <Stack.Screen
          name={Screens.GROUPCHATROOM}
          component={GroupChatRoom}
          options={{title: 'Group Chat Room'}}
        />
        <Stack.Screen
          name={Screens.CREATEGROUP}
          component={CreateGroup}
          options={{title: 'Create Group'}}
        />
        <Stack.Screen
          name={Screens.SIGNUP}
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.VIEWGROUPMEMBERS}
          component={ViewGroupMembers}
          options={{title: 'Group Members List'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
