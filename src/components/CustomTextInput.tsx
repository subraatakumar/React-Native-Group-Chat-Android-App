import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from './AppCss';

type validations =
  | 'valid-email'
  | 'only-digits'
  | 'only-letters'
  | 'no-space'
  | 'max'
  | 'min'
  | 'nil';
type types = 'Text' | 'Password';

type CustomTextInputProps = {
  value?: string | null;
  setValue?: Function | null;
  err?: boolean;
  setErr?: Function;
  type?: types;
  placeholder?: string;
  validation?: validations[] | [];
  style?: any;
  max?: number;
  min?: number;
  m?: number | null;
  p?: number | null;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  h?: number;
  w?: number | '100%';
  fct?: string | null; // Font color title
  fci?: string | null; // Font color input
  fce?: string | null; // Font color error
  bgct?: string | null; // Background color title. Same as bgci if not provided
  bgci?: string | null; // Background color input. Default white
  bgce?: string | null; // Background color error. Same as bgci if not provided
  fst?: number; // Font Size title, default is 12
  fsi?: number; // Font size input, default is 16
  fse?: number; // Font size error, default is 10
  title?: string | null; // Same as placeholder if not mentioned
  hideTitle?: boolean; // if true title will be hiden. Default is false
  errorPosition?: 'default' | 'normal';
  customRef?: any;
};

const CustomTextInput = ({
  value = null,
  setValue = null,
  err = false,
  setErr = () => {},
  type = 'Text',
  placeholder = '',
  validation = [],
  style = [],
  min = 3,
  max = 30,
  m = null,
  p = 0,
  ml = 0,
  mr = 0,
  mb = validation.length === 0 ? 0 : 20,
  mt = 0,
  h = 40,
  w = 250,
  fct = null,
  fce = 'red',
  fci = null,
  fst = h / 3,
  fsi = h * 0.4,
  fse = h / 4,
  bgci = '#fff',
  bgct = null,
  bgce = null,
  title = null,
  hideTitle = false,
  errorPosition = 'default',
  customRef = null,
}: CustomTextInputProps) => {
  const [compErr, setCompErr] = useState('');
  const [pText, setPtext] = useState(title ? ' ' + title + ' ' : '');

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const onChangeText = t => {
    setValue && setValue(t);

    if (t === '') {
      setCompErr('');
      setPtext(title ? ' ' + title + ' ' : '');
      return;
    } else {
      setPtext(title ? ' ' + title + ' ' : ' ' + placeholder + ' ');
    }
    for (let i = 0; i < validation.length; i++) {
      if (validation[i] === 'valid-email' && reg.test(t) === false) {
        setCompErr(' Invalid Email Address ');
        !err && setErr(true);
        break;
      } else if (validation[i] === 'no-space' && t.trim().includes(' ')) {
        setCompErr(" Don't include space ");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'only-digits' && isNaN(t)) {
        setCompErr(" Don't include letters ");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'only-letters' && /[0-9]/.test(t)) {
        setCompErr(" Don't include numbers ");
        !err && setErr(true);
        break;
      } else if (validation[i] === 'max' && t.trim().length > max) {
        setCompErr(' Should not be greater then ' + max + ' characters ');
        !err && setErr(true);
        break;
      } else if (validation[i] === 'min' && t.trim().length < min) {
        setCompErr(' Should not be less then ' + min + ' characters ');
        !err && setErr(true);
        break;
      } else if (validation.length == i + 1) {
        setCompErr('');
        setErr(false);
      }
    }
  };

  const isControlledComponent = () => {
    if (value !== null && setValue !== null) {
      return {
        value: value,
        onChangeText: t => {
          onChangeText(t);
        },
      };
    } else {
      return {
        onChangeText: t => {
          customRef.current = t;
        },
        onEndEditing: ev => {
          customRef.current = ev.nativeEvent.text;
        },
      };
    }
  };

  return (
    <>
      <View
        style={{
          marginBottom: m ? m : mb,
          marginTop: m ? m : mt,
          marginLeft: m ? m : ml,
          marginRight: m ? m : mr,
          padding: p,
        }}>
        <TextInput
          autoCorrect={false}
          secureTextEntry={type === 'Password' ? true : false}
          {...isControlledComponent()}
          placeholder={placeholder ? placeholder : ''}
          style={{
            ...globalStyles.planeTextInput,
            height: h,
            width: w,
            fontSize: fsi,
            backgroundColor: bgci,
            color: fci,
            padding: h ? h / 5 : null,

            ...style,
          }}
        />
        {!hideTitle && (
          <Text
            style={{
              position: 'absolute',
              fontSize: fst,
              color: fct,
              top: -(fst * 0.8),
              marginLeft: 10,
              backgroundColor: bgct ? bgct : bgci,
              borderRadius: 3,
            }}>
            {`${pText}`}
          </Text>
        )}

        <Text
          style={
            errorPosition === 'normal'
              ? {
                  color: fce,
                  fontSize: fse,
                  backgroundColor: bgce ? bgce : bgci,
                  borderRadius: 3,
                  width: w,
                  marginTop: 3,
                }
              : {
                  color: fce,
                  fontSize: fse,
                  position: 'absolute',
                  top: h - fse,
                  marginLeft: 10,
                  backgroundColor: bgce ? bgce : bgci,
                  borderRadius: 3,
                }
          }>
          {compErr}
        </Text>
      </View>
    </>
  );
};

export default CustomTextInput;
