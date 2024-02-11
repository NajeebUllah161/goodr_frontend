/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize as fp,
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';

// constants
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateEffect} from 'react-use';
import {RootStackParamList} from '../../Main';
import ToggleEye from '../assets/images/eye_toggle.svg';
import LoginContainerBg from '../assets/images/login_container_bg.svg';
import {LoginResponse} from '../classes/LoginResponse';
import Loader from '../components/Loader';
import {COLORS_PRIMARY, FONTS, SIZES} from '../constants';
import {
  END_POINTS,
  IS_ANDROID,
  IS_IOS,
  METHODS,
  height,
} from '../constants/theme';
import {LOGIN, PRODUCTS} from '../redux/Types';
import apiCall from '../redux/actions/apiCall';
import {consoleLog, isNotEmpty} from '../utils/Reusables';
import {ProductsResponse} from '../classes/ProductResponse';

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

const LoginScreen = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  const loading = useSelector((state: any) => state.loader?.loaderStatus);
  const loginResponse: LoginResponse = useSelector(
    (state: any) => state.auth?.loginResponse,
  );
  const [secureEntry, setSecureEntry] = useState(true);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // 1) Login handler
  useUpdateEffect(() => {
    if (loginResponse.data) {
      consoleLog('Success Login Response : ', loginResponse);
      navigateHandler('product');
    } else {
      consoleLog('Error Login Response : ', loginResponse.error);
    }
  }, [loginResponse]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        // Prevent default behavior of leaving the screen
        if (e?.data?.action.type === 'GO_BACK') {
          e.preventDefault();
          BackHandler.exitApp();
        }
        consoleLog(
          'Before Remove LoginScreen and Action Type',
          e.data.action.type,
        );
      }),
    [navigation],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmailAddress('');
      setPassword('');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHandler = () => {
    setSecureEntry(!secureEntry);
  };

  const loginHandler = () => {
    if (!isNotEmpty(emailAddress)) {
      dispatch({
        type: 'ERROR',
        payload: {
          title: 'Validation Error',
          error: 'Email required',
          status: false,
        },
      });
      return;
    }

    if (!isNotEmpty(password)) {
      dispatch({
        type: 'ERROR',
        payload: {
          title: 'Validation Error',
          error: 'Password required',
          status: false,
        },
      });
      return;
    }

    const body = {
      username: emailAddress,
      password,
    };

    const config = {
      method: METHODS.POST,
      url: END_POINTS.LOGIN,
      data: body,
    };

    dispatch<any>(apiCall(config, LOGIN));
  };

  const navigateHandler = (screenName: keyof RootStackParamList) => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: screenName}],
    // });

    navigation.navigate('product');
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{flex: SIZES.flex1}}>
      <View
        style={{
          height: height,
          backgroundColor: COLORS_PRIMARY.certifiedProfile,
          paddingTop: hp(25),
          paddingHorizontal: SIZES.p22,
        }}>
        <Text
          children="Login"
          style={{
            color: COLORS_PRIMARY.white,
            fontSize: fp(2.8),
            fontFamily: FONTS.InterRegular,
          }}
        />
        <View style={{marginTop: SIZES.m36}}>
          {/* Label */}
          <Text
            children="Username"
            style={{
              color: COLORS_PRIMARY.white,
              fontFamily: FONTS.InterRegular,
              fontSize: fp(2),
            }}
          />
          {/* Input */}
          <TextInput
            autoCapitalize="none"
            selectionColor={
              IS_ANDROID ? 'rgba(0, 0, 0, 0.5)' : COLORS_PRIMARY.white
            }
            textContentType="emailAddress"
            value={emailAddress}
            autoCorrect={false}
            onChangeText={setEmailAddress}
            style={{
              borderWidth: 1,
              borderColor: COLORS_PRIMARY.white,
              marginTop: SIZES.m10,
              padding: SIZES.p11,
              borderRadius: SIZES.r5,
              color: COLORS_PRIMARY.white,
              fontFamily: FONTS.InterRegular,
              fontSize: fp(1.8),
            }}
          />
        </View>
        <View style={{marginTop: SIZES.m30}}>
          {/* Label */}
          <Text
            children="Password"
            style={{
              color: COLORS_PRIMARY.white,
              fontFamily: FONTS.InterRegular,
              fontSize: fp(2),
            }}
          />
          {/* Input */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.m10,
            }}>
            <TextInput
              autoCapitalize="none"
              selectionColor={
                IS_ANDROID ? 'rgba(0, 0, 0, 0.5)' : COLORS_PRIMARY.white
              }
              secureTextEntry={secureEntry}
              textContentType="password"
              value={password}
              onChangeText={setPassword}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS_PRIMARY.white,
                padding: SIZES.p11,
                borderRadius: SIZES.r5,
                color: COLORS_PRIMARY.white,
                fontFamily: FONTS.InterRegular,
                fontSize: fp(1.8),
              }}
            />
            <TouchableOpacity
              onPress={toggleHandler}
              activeOpacity={0.7}
              style={{position: 'absolute', end: 4}}>
              <ToggleEye height={hp(3.3)} width={hp(3.3)} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerLastRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touchableLogin}
            onPress={loginHandler}>
            <Text children="Login" style={styles.txtLogin} />
          </TouchableOpacity>
        </View>
      </View>
      {loading && <Loader />}
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_PRIMARY.white,
  },
  subContainerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: wp(2),
  },
  checkbox: {
    height: SIZES.screenHeight > 926 ? hp(2) : 14,
    width: SIZES.screenHeight > 926 ? wp(4) : 14,
    marginEnd: IS_IOS ? SIZES.m10 : SIZES.m20,
  },
  txtRemember: {
    color: COLORS_PRIMARY.white,
    fontFamily: FONTS.InterRegular,
    fontSize: SIZES.screenHeight > 926 ? fp(2) : SIZES.f15,
  },
  txtForgotPwd: {
    color: COLORS_PRIMARY.white,
    fontFamily: FONTS.InterMedium,
    fontSize: SIZES.screenHeight > 926 ? fp(2) : SIZES.f15,
  },
  containerLastRow: {marginTop: SIZES.m36},
  containerSignup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtSignup: {
    color: COLORS_PRIMARY.white,
    fontFamily: FONTS.InterMedium,
    fontSize: SIZES.screenHeight > 926 ? fp(2) : SIZES.f15,
    marginEnd: SIZES.m4,
  },
  txtHaveAcc: {
    color: COLORS_PRIMARY.white,
    fontFamily: FONTS.InterRegular,
    fontSize: SIZES.screenHeight > 926 ? fp(2) : SIZES.f15,
    marginEnd: SIZES.m4,
  },
  touchableLogin: {
    backgroundColor: COLORS_PRIMARY.white,
    padding: SIZES.p10,
    alignItems: 'center',
    borderRadius: SIZES.r60,
  },
  txtLogin: {
    color: COLORS_PRIMARY.certified,
    fontFamily: FONTS.InterMedium,
    fontSize: fp(2),
  },
});
