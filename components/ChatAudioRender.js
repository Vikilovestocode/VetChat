
import React, { useEffect } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getImageDloadUrlReq } from '../actions/consultAction';
import AudioPlayer from './AudioPlayer';



export default function ChatAudioRender(props){
    console.log('renderMessageAudio-------is audio::', !!props.currentMessage.audio)
    console.log('renderMessageAudio-------is audio:txt:', props.currentMessage.text)

    const {
        currentMessage
      } = props
      const dispatch = useDispatch();
    
      const { currMsgImgUlrMap } = useSelector(({consultReducer})=>{
        return consultReducer
     })    
      
      useEffect(()=>{
        console.log(' chat render audio pathurl', currentMessage.pathUrl);
        if(!currMsgImgUlrMap[currentMessage.pathUrl]){
          dispatch(getImageDloadUrlReq(currentMessage.pathUrl))
        }
      }, [])

      if (!!currentMessage) {
        if(!currentMessage.file && currMsgImgUlrMap && !currMsgImgUlrMap[currentMessage.pathUrl]){
          return  <ActivityIndicator animating={true} color={Colors.red800} />
        }
        console.log(' chat render audio pathurl', currentMessage.pathUrl, currMsgImgUlrMap[currentMessage.pathUrl] );
        return (  <AudioPlayer recording={currentMessage.file || currMsgImgUlrMap[currentMessage.pathUrl] } />)
      }
      return null

}