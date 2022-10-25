import React from 'react';
import StackNavigator from './src/navigator/StackNavigator';
import {SafeAreaView} from 'react-native';

import store from './src/redux/store';
import {Provider} from 'react-redux';
import CustomModal from './src/components/CustomModal';
import FlashScreen from './src/components/FlashComponent';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <FlashScreen />
        <CustomModal />
        <StackNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
