import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import backImage from '../assets/img/backImage.png';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Constants, Screens, ThemeColors} from '../settings/config';
import {useNavigation} from '@react-navigation/native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {
  signIn,
  useAppDispatch,
  hideModal,
  showModal,
  resetUserState,
} from '../redux/store';
import {CustomModalTypes} from '../components/CustomModal';
import Logo from '../components/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(true);
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(true);

  const {userStatus, user, userError} = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    if (user !== null) {
      navigation.replace(Screens.HOME);
    }
  }, [user]);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userStatus === Constants.LOADING) {
      dispatch(
        showModal({
          type: CustomModalTypes.WARNING,
          title: 'Sign In',
          body: 'Please wait Signing user.',
          closable: false,
        }),
      );
      return;
    }
    if (userStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Sign In Error',
          body: userError,
          closable: true,
        }),
      );
      dispatch(resetUserState());

      return;
    }
    if (userStatus == Constants.FULFILLED) {
      dispatch(hideModal());
      dispatch(resetUserState());
      return;
    }
  }, [userStatus, userError]);
  const loginClicked = () => {
    dispatch(signIn({email, password}));
  };

  return (
    <ImageBackground source={backImage} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'transparent',
          justifyContent: 'space-evenly',
        }}>
        <Logo />
        <View>
          <CustomTextInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            err={emailErr}
            setErr={setEmailErr}
            validation={['valid-email']}
            style={{borderColor: ThemeColors.primary}}
            fct={ThemeColors.primary}
          />
          <CustomTextInput
            placeholder="Password"
            type={'Password'}
            value={password}
            setValue={setPassword}
            err={passErr}
            setErr={setPassErr}
            validation={['min']}
            min={6}
            style={{borderColor: ThemeColors.primary}}
            fct={ThemeColors.primary}
          />
          <CustomButton
            title={'Login'}
            style={{marginBottom: 15}}
            bgc={ThemeColors.primary}
            onPressFn={loginClicked}
            br={5}
            disabled={emailErr || passErr}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.replace(Screens.SIGNUP);
            }}>
            <Text style={{textAlign: 'center', marginBottom: 25}}>
              Don't have an account? Create One.
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </ImageBackground>
  );
};

export default Login;
