import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ActivityIndicator, Colors } from "react-native-paper";

export default function AudioRecord(props) {
  const [recording, setRecording] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setIsLoading(true);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    props.recordCallback(recording)
  }
    console.log('props.recordingIcon::::', props.startRecordIcon)

  if(isLoading)
      return <ActivityIndicator animating={true} size={'large'} color={Colors.indigoA700} />

  return (
    <View style={(props.startRecordIcon? props.containerStyle|| {} : styles.container)}>
      { props.startRecordIcon ? (
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
        {(recording? <props.recordingIcon/> : <props.startRecordIcon/>)}
        </TouchableOpacity>
      ):(
        <Button
        title={recording ? 'Stop Audio Recording' : 'Start Audio Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
