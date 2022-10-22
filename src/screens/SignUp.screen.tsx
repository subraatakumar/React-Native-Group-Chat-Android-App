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
import Logo from '../assets/img/logo.gif';
import backImage from '../assets/img/backImage.png';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Constants, Screens, ThemeColors} from '../settings/config';
import {useNavigation} from '@react-navigation/native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {hideModal, showModal} from '../redux/slices/modalSlice';
import {signUp, useAppDispatch} from '../redux/store';
import {CustomModalTypes} from '../components/CustomModal';
import {resetUserState} from '../redux/slices/userSlice';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayNameErr, setdisplayNameErr] = useState(true);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(true);
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(true);

  const {userStatus, user, userError} = useSelector(
    (state: any) => state.userReducer,
  );

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user !== null) {
      navigation.replace(Screens.HOME);
    }
  }, [user]);

  useEffect(() => {
    if (userStatus === Constants.LOADING) {
      dispatch(
        showModal({
          type: CustomModalTypes.WARNING,
          title: 'Sign Up',
          body: 'Please wait Creating user.',
          closable: false,
        }),
      );
      return;
    }

    if (userStatus === Constants.REJECTED) {
      dispatch(
        showModal({
          type: CustomModalTypes.ERROR,
          title: 'Sign Up Error',
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
    console.log(email, password, userStatus);
    dispatch(signUp({email, password, displayName}));
    console.log('after Signup userstatus', userStatus);
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
        <View style={{marginBottom: 20}}>
          <Image source={Logo} style={{width: 250, height: 150}} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: ThemeColors.primary,
              fontWeight: 'bold',
            }}>
            Group Chat Application
          </Text>
        </View>
        <View>
          <CustomTextInput
            placeholder="Display Name"
            value={displayName}
            setValue={setDisplayName}
            err={displayNameErr}
            setErr={setdisplayNameErr}
            validation={['min', 'max']}
            style={{borderColor: ThemeColors.primary}}
            fct={ThemeColors.primary}
            mb={10}
            min={3}
            max={50}
          />

          <CustomTextInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            err={emailErr}
            setErr={setEmailErr}
            validation={['valid-email']}
            style={{borderColor: ThemeColors.primary}}
            fct={ThemeColors.primary}
            mb={10}
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
            mb={10}
          />
          <CustomButton
            title={'Create User'}
            style={{marginBottom: 15}}
            bgc={ThemeColors.primary}
            onPressFn={loginClicked}
            br={5}
            disabled={emailErr || passErr || displayNameErr}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.replace(Screens.LOGIN);
            }}>
            <Text style={{textAlign: 'center', marginBottom: 25}}>
              Have an account? Login.
            </Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
