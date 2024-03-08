/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Playing} from './screens';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Playing />
    </NavigationContainer>
  );
}

export default App;
