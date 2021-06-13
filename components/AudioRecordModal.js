import * as React from 'react';
import AudioRecord from "./AudioRecord";
import { View, Text } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const AudioModal = (props) =>{

    const startRecord = () => (
      <View > 
      <View style={{ alignSelf: 'center'}}> 
        <FontAwesome name="microphone" size={60} color="black" />
      </View>
      <View style={{ alignSelf:'center'}}>
        <Text>Tap to record</Text>
      </View>
      </View>
    )

    const recordingIcon = () => (
      <View > 
      <View style={{ alignSelf: 'center'}}> 
        <FontAwesome name="microphone" size={60} color="green" />
      </View>
      <View style={{ alignSelf:'center'}}>
        <Text>Recording... Tap to stop recodirng</Text>
      </View>
      </View>
    )


    
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.hideDialog}>
        <Dialog.Content>
            <AudioRecord startRecordIcon={startRecord} recordingIcon={recordingIcon} recordCallback={props.recordCallback}/>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );

}

export default AudioModal;
 