import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { getDocUrl } from  '../api/consultApi';

export default function VideoPlayer(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const getFile = async (uri) =>{
    const doc = await getDocUrl({ uri })
    return doc;
  };

  let uri;
  if(typeof props.videoUri == 'string'){
    uri = props.videoUri
  } else {
    uri = props.videoUri.uri;
  }

  return (
    <View >
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 200,
    height: 98,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
