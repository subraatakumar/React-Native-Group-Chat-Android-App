import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home.screen';
import {ThemeColors} from '../settings/config';
import ChatRoom from '../screens/ChatRoom.screen';
import CreateGroup from '../screens/CreateGroup.screen';
import Login from '../screens/Login.screen';

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
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{title: 'Chat Room'}}
        />
        <Stack.Screen
          name="CreateGroup"
          component={CreateGroup}
          options={{title: 'Create Group'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
