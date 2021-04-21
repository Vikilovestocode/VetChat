import * as React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

export default function AudioPlayer(props) {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } =  await props.recording.createNewLoadedSoundAsync()

    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Pressable onPress={()=> (props.removeRecording())}>
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
