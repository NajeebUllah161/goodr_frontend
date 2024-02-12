import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Main from './Main';
import store from './src/redux/store';

// React navigation
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
