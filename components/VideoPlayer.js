import * as React from 'react';
import { View, StyleSheet, Button, Pressable, Image, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { getDocUrl } from  '../api/consultApi';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { AntDesign, EvilIcons } from '@expo/vector-icons'; 

export default function VideoPlayer(props) {
  const video = React.useRef(null);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [play, setPlay] = React.useState(false);
  const  [videoUrl, setVideoUrl] = React.useState(null);

  const deleteVideo = ()=> {
    //  dispatch(deleteMediaRequest({ pathUrl: props.uploadUrl }))
     if (props.removeVideo)
        props.removeVideo(props.uploadUrl);
   }

  const generateThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 1500});
      setThumbnail(uri);
      setVideoUrl(videoUri)
    } catch (e) {
      console.warn(e);
    }
  };

  React.useEffect(()=>{
    let urlValue = '';
    if(typeof props.videoUri == 'string'){
      urlValue = props.videoUri;
    } else {
      urlValue = props.videoUri.uri;
    }
    console.log( " video.current", video.current)
    console.log( " urlValue", urlValue)
    if(!video.current){
      generateThumbnail(urlValue)
      
    } else {
      video.current.playAsync()
    }
  },[])
 console.log(' thumbnail:: ',thumbnail)
 console.log(' thumbnail:play: ',play)
  return (
    <View style={styles.container} >
      {
        !play && (
          <Pressable onPress={()=> setPlay(true)}>
           <ImageBackground  style={{ width: 250, height: 150}} source={ {uri: thumbnail}}>
               <EvilIcons name="play" size={40} color="black" />
          </ImageBackground>
          </Pressable>
        )
      }
     {
       play &&
        <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl
        }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
     }
     { props.removeVideo && 
        ( <Pressable onPress={()=> deleteVideo()}>
          <AntDesign name="delete" style={{ alignSelf: 'flex-end' }} size={24} color="black" />
          </Pressable>
          )
     }
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    padding: 10,
  },
  video: {
    alignSelf: 'center',
    width: 250, 
    height: 150
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
