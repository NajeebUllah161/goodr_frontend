import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Main from './Main';
import store from './src/redux/store';

// React navigation
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  useEffect(() => {
    // requestUserPermission();

    setTimeout(async () => {
      // SplashScreen.hide();
    }, 2800);
  }, []);

  // async function requestUserPermission() {
  //   if (IS_IOS) {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   } else {
  //     // replace with react-native-permissions for being able to work in Android 13
  //     const checkPermission = await checkNotificationPermission();
  //     if (checkPermission !== RESULTS.GRANTED) {
  //       try {
  //         const request = await requestNotificationPermission();
  //         if (request !== RESULTS.GRANTED) {
  //           // permission not granted
  //           console.log('Permission Not Granted Android');
  //         } else if (request === RESULTS.GRANTED) {
  //           console.log('Permission Granted Android');
  //         } else if (request === RESULTS.DENIED) {
  //           console.log('Permissions Denied');
  //         }
  //       } catch (error) {
  //         console.log('Permissions Error : ', error);
  //       }
  //     }
  //   }
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
