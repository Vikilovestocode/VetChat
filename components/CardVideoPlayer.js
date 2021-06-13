import * as React from 'react';
import { View, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { getDocUrl } from  '../api/consultApi';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { AntDesign, EvilIcons } from '@expo/vector-icons'; 
import { Card, Button } from 'react-native-paper';

export default function CardVideoPlayer(props) {
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
  <Card key={props.fullPathUrl} style={{ padding: 10}}>
      {
        !play && ( 
          <View style={styles.container}>
          <Pressable onPress={()=> setPlay(true)}>
          <ImageBackground  style={{ width: 250, height: 150}} source={ {uri: thumbnail}}>
               <AntDesign name="playcircleo" style={{ zIndex: 10, alignSelf: 'center', marginTop: 55}} size={40} color="green" />
              {/* <EvilIcons style={{ zIndex: 100000, }} name="play" size={40} color="green" /> */}
         </ImageBackground>
         </Pressable>
         </View>
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
      <Card.Actions>
          <Button onPress={()=>(deleteVideo())}>Remove</Button>
      </Card.Actions>}
  </Card>
  );
  // return (
  //   <View style={styles.container} >
      // {
      //   !play && (
          // <Pressable onPress={()=> setPlay(true)}>
          //  <ImageBackground  style={{ width: 250, height: 150}} source={ {uri: thumbnail}}>
          //      <EvilIcons name="play" size={40} color="black" />
          // </ImageBackground>
          // </Pressable>
      //   )
      // }
  //    {
  //      play &&
  //       <Video
  //       ref={video}
  //       style={styles.video}
  //       source={{
  //         uri: videoUrl
  //       }}
  //       useNativeControls
  //       resizeMode="contain"
  //       isLooping={false}
  //       // onPlaybackStatusUpdate={status => setStatus(() => status)}
  //       />
  //    }
  //    { props.removeVideo && 
  //       ( <Pressable onPress={()=> deleteVideo()}>
  //         <AntDesign name="delete" style={{ alignSelf: 'flex-end' }} size={24} color="black" />
  //         </Pressable>
  //         )
  //    }
  //     {/* <View style={styles.buttons}>
  //       <Button
  //         title={status.isPlaying ? 'Pause' : 'Play'}
  //         onPress={() =>
  //           status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
  //         }
  //       />
  //     </View> */}
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    // padding: 10,
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
