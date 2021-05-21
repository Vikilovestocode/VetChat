/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image, Button, View, Text } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons'; 
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

import {
  MessageText,
  MessageImage,
  Time,
  utils,
} from 'react-native-gifted-chat'
import ChatAudioRender from './ChatAudioRender';
import ChatVideoRender from './ChatVideoRender';




export const renderInputToolbar = (props) => (
<>

  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#222B45',
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />

</>
);

export const renderActions = (props) =>{
  return (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        // <Image
        //   style={{ width: 32, height: 32 }}
        //   source={{
        //     uri: 'https://placeimg.com/32/32/any',
        //   }}
        // />
        <Ionicons name="add-circle-outline" size={24} color="white" />
      )}
      options={props.actionList}
      optionTintColor="#222B45"
    />
  )
}

export const renderComposer = (props) => {
  
  return (
    <Composer
      {...props}
      textInputStyle={{
        backgroundColor: '#EDF1F7',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E4E9F2',
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  )
};

export const renderSend = (props) => (
  <Send
    {...props}
    alwaysShowSend={true}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
  >
    
  </Send>
);

export const renderMessageVideo  =(props) =>{
  console.log('renderMessageVideo-------')
  if(props.currentMessage && props.currentMessage.video){
    // return ( <VideoPlayer uri={props.currentMessage.video}/>)
    return (<ChatVideoRender { ...props }/>);
  }

  // return ( <MessageText {...props} /> )
   
}

export const renderMessageAudio  =(props) =>{
  console.log('renderMessageAudio-------is audio::', !!props.currentMessage.audio)

  console.log('renderMessageAudio-------is audio:txt:', props.currentMessage.text)
  if(props.currentMessage && props.currentMessage.audio){
    // return <AudioPlayer recording={props.currentMessage.audio} />
    return (<ChatAudioRender { ...props }/>);
    // return <Text>audio</Text>
  }

  // return ( <MessageText {...props} /> )
   
}

export const renderMessage  =(props) =>{
  console.log(' renderMessage calling')

  // if(props.currentMessage && props.currentMessage.video){
  //   return ( <VideoPlayer/>)
  // } else
  //  if(props.currentMessage && props.currentMessage.audio){
  //   return <AudioPlayer recording={props.audioMsg} />
  // }

  return ( <MessageText {...props} /> )
}
