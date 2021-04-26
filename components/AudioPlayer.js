import * as React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { consultationImgUpload } from '../api/consultApi';
import { addMediaRequest, deleteMediaRequest } from '../actions/consultAction';
import { useDispatch } from 'react-redux';


export default function AudioPlayer(props) {
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } =  await props.recording.createNewLoadedSoundAsync()

    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  React.useEffect(()=> {
    const asyncUpload = async ()=>{
      console.log('asyn upload')
      const isUploaded = await AsyncStorage.getItem('isUploadedAudio')
      console.log('asyn upload isUploaded::', isUploaded, props.recording)

      if(!isUploaded){ 
        const task = consultationImgUpload({file: props.recording, pathUrl: props.uploadUrl})
        await AsyncStorage.setItem('isUploadedAudio', true);
      }
    }
    asyncUpload()
  },[])  
 
 const dispatch = useDispatch();
 const removeRec = ()=> {
  dispatch(deleteMediaRequest({pathUrl: props.uploadUrl}))
  props.removeRecording();
 }

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Pressable onPress={removeRec}>
       <EvilIcons style={styles.removeIcon} name="close-o" size={24} color="red" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  removeIcon: {
        alignSelf: 'center'
  },  
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
