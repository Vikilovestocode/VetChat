import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './navigation/AppNavigation';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Appbar } from 'react-native-paper';


import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector } from 'react-redux';
// Imports: Redux Persist Persister
import { store, persistor } from './store/store';


// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは' },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const getUserInfo = async ()=> {
  const data = await AsyncStorage.getItem("userInfo")
  return data;
}


export default function App() {

  const [userInfo, setUserInfo] = useState(null);
// useEffect(()=>{
// const data = getUserInfo();
// setUserInfo(data)
// },[]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            {/* <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={ConsultFormStepOne} />
              <Stack.Screen name="consultstep2" component={ConsultFormStepTwo} />
              <Stack.Screen name="chatScreen" component={ChatScreen} />
            </Stack.Navigator> */}
            <AppNavigation/>
          </NavigationContainer>
        </PaperProvider> 
    </PersistGate>
  </Provider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
