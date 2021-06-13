import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ConsultationListScreen from '../screens/ConsultationListScreen';
import AddPetForm from '../components/AddPetForm';
import ConsultFormStepOne from '../components/ConsultFormStepOne';
import ConsultFormStepTwo from '../components/ConsultFormStepTwo';
import { FontAwesome } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { createStackNavigator } from '@react-navigation/stack';
import { navMap } from  './navConstant';
import SignUpScreen from '../screens/SignUpScreen';
import { useSelector } from 'react-redux';
import SettingScreen from '../screens/SettingScreen';
import { AntDesign } from '@expo/vector-icons'; 

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();


const HomeStack = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name={navMap.signup} initialParams={ { nextScreen: navMap.home } } component={SignUpScreen} />
        <Stack.Screen name={navMap.home} component={HomeScreen} />
        <Stack.Screen name={navMap.consultationStep1} component={ConsultFormStepOne} />
        <Stack.Screen name={navMap.consultationStep2} component={ConsultFormStepTwo} />
        <Stack.Screen name={navMap.chat} component={ChatScreen} />
   </Stack.Navigator>
  )
}


const ConstulitaionStack = () => {
  return (
    <Stack.Navigator >
        {/* <Stack.Screen name={navMap.signup} initialParams={ { nextScreen: navMap.home } } component={SignUpScreen} /> */}
        <Stack.Screen name={navMap.consultList} initialParams={ { nextScreen: navMap.home } } component={ConsultationListScreen} />
        <Stack.Screen name={navMap.consultationStep1} component={ConsultFormStepOne} />
        <Stack.Screen name={navMap.consultationStep2} component={ConsultFormStepTwo} />
        <Stack.Screen name={navMap.chat} component={ChatScreen} />
   </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={navMap.signup}>
            <Stack.Screen name={navMap.signup} component={SignUpScreen} />
   </Stack.Navigator>
  )
}


export default function NavComp(){
  const { user } = useSelector(({ authReducer })=> (authReducer))

  console.log(' navigation ', user);

  // if(!user){
  //   return ( <AuthStack />)
  // }
  return (
    <Tab.Navigator      
     initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack}  
      options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
            ),
        }}/> 
      <Tab.Screen name="Details" component={ConstulitaionStack}   
      options={{
          tabBarLabel: 'Consultaion',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="stethoscope" size={24} color={color} />
          ),
        }}/>
        <Tab.Screen name="Settings" component={SettingScreen}   
      options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );

}