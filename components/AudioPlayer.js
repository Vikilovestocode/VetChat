import * as React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { deleteMediaRequest } from '../actions/consultAction';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function AudioPlayer(props) {
  const [sound, setSound] = React.useState();
  const [playSts, setPlaysts] = React.useState();

  async function onPlaybackStatusUpdate( playBackStatus ){
    console.log(' on playBackStatus::::', !!playBackStatus)
    setPlaysts(playBackStatus)
  }
 
  async function playSound() {
    console.log('Loading Sound');
    let soundObj;  
    if(typeof props.recording == 'string'){
      const {
        sound,
        status,
      } = await Audio.Sound.createAsync({ uri :props.recording});
      // Your sound is playing!
      soundObj = sound;
      console.log(" playsound fetch soundObj:", soundObj)
    } else {

      const { sound } =  await props.recording.createNewLoadedSoundAsync()
      soundObj = sound;
      console.log(" playsound local soundObj:", !!soundObj)
  
    }
      setSound(soundObj);
  
      //  "playableDurationMillis": 8312,
     // "positionMillis": 8312,
      console.log('Playing Sound soundObj:', !!soundObj);
      soundObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      await soundObj.playAsync(); 
    
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

   React.useEffect(()=> {
    if(playSts && playSts.didJustFinish){
      setPlaysts(null) 
    }
   }, [])

  // React.useEffect(()=> {
  //   const asyncUpload = async ()=>{
  //     console.log('asyn upload')
  //     const isUploaded = await AsyncStorage.getItem('isUploadedAudio')
  //     console.log('asyn upload isUploaded::', isUploaded, props.recording)

  //     if(!isUploaded){ 
  //       const task = consultationImgUpload({file: props.recording, pathUrl: props.uploadUrl})
  //       await AsyncStorage.setItem('isUploadedAudio', 'true');
  //     }
  //   }
  //   asyncUpload()
  // },[])  
 
 const dispatch = useDispatch();

 const progressStatus = (playBackStatus)=>{
    //  "playableDurationMillis": 8312,
   // "positionMillis": 8312,
   console.log(' palying::::')
   const percent = playBackStatus && playBackStatus.positionMillis ? 
                (playBackStatus.positionMillis /playBackStatus.playableDurationMillis)*100: 0;
   return percent
 }
 
 const removeRec = ()=> {
  //  dispatch(deleteMediaRequest({ pathUrl: props.uploadUrl }))
   if (props.removeRecording)
     props.removeRecording(props.uploadUrl);
 }

 const millisToMinutesAndSeconds = (millis) => {
  if(!millis) return `00:00`; 
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `- ${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

const getDiff = ( time1, time2 ) => ((time1? time1 - time2: 0))

  return (
    <View style={styles.container}>
      {/* <Button title="Play Sound" onPress={playSound} />
      <Pressable onPress={removeRec}>
       <EvilIcons style={styles.removeIcon} name="close-o" size={24} color="red" />
      </Pressable> */}
      <View>
        <Pressable onPress={playSound}>
          <MaterialCommunityIcons name="play-circle-outline" style={{ alignSelf: 'flex-start' }} size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Slider
          style={{ height: 30, width: 160 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={progressStatus(playSts)}
        />
      </View>
      <View>
        <Text>{playSts && !playSts.didJustFinish ?
          millisToMinutesAndSeconds(getDiff(playSts.playableDurationMillis, playSts.positionMillis)) : "00:00"}
        </Text>
      </View>
      <View>
        {
          props.removeRecording &&
          <Pressable onPress={removeRec}>
            <AntDesign name="delete" style={{ alignSelf: 'flex-end' }} size={24} color="black" />
          </Pressable>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  removeIcon: {
        alignSelf: 'center'
  },  
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
