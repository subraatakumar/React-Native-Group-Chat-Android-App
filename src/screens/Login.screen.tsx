import React, {useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import Logo from '../assets/img/logo.gif';
import backImage from '../assets/img/backImage.png';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Constants, ThemeColors} from '../settings/config';
import {useNavigation} from '@react-navigation/native';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {showModal} from '../redux/slices/modalSlice';
import {signIn, useAppDispatch} from '../redux/store';
import {CustomModalTypes} from '../components/CustomModal';
import {resetUserState} from '../redux/slices/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(true);
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(true);

  const {userStatus, data, userError} = useSelector(
    (state: any) => state.userReducer,
  );

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
  }, [userStatus, userError]);
  const loginClicked = () => {
    console.log(email, password, userStatus);
    dispatch(signIn({email, password}));
    console.log('after signin', userStatus);
    // auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log('Successful login.');
    //   })
    //   .catch(err => {
    //     console.log('Error Code: ', err.code);
    //     console.log('Error Message: ', err.message);
    //   });
    //navigation.navigate('Home');
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
        <View>
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
            style={{marginBottom: 40}}
            bgc={ThemeColors.primary}
            onPressFn={loginClicked}
            br={5}
            disabled={emailErr || passErr}
          />
          <Text style={{textAlign: 'center'}}>
            Don't have an account? Create One.
          </Text>
        </View>
        <View></View>
      </View>
    </ImageBackground>
  );
};

export default Login;
