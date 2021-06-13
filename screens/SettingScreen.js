import React from 'react';
import { Text, View, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { navMap } from '../navigation/navConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen({ navigation }) {

const clearStoreage = async ()=>{
  console.log("Before clear", await AsyncStorage.getAllKeys())
  await AsyncStorage.clear();
  
  console.log("Aftrer clear", await AsyncStorage.getAllKeys())

}

const print = async ()=>{
  const keys = await AsyncStorage.getAllKeys();
  console.log("All keys :", keys)
  keys.forEach(async (key) =>{              
    console.log(" key ", key, await AsyncStorage.getItem(key))
   } )

}


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

{/* <Appbar style={styles.top} dark={true}>
   <Appbar.Action
     icon={()=>( <FontAwesome name="bars" size={24} color="black" />)}
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar> */}

     
      <Text>Setting Screen</Text>
      <Button
        title="Print"
        onPress={() =>(print())}
      />

      <Button
        title="Clear"
        onPress={() =>(clearStoreage())}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});