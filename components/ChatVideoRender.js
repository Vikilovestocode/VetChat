
import React, { useEffect } from 'react'
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getImageDloadUrlReq } from '../actions/consultAction';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';



export default function ChatVideoRender(props){
    console.log('ChatVideoRender-------is video::', !!props.currentMessage.video)
    console.log('ChatVideoRender-------is video:txt:', props.currentMessage.text)

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
        return ( <VideoPlayer videoUri={props.currentMessage.file || currMsgImgUlrMap[currentMessage.pathUrl]}/>)
      }
      return null

}