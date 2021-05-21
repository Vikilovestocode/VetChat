import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, Button, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, utils, IMessage } from 'react-native-gifted-chat'
import { Portal, Modal } from 'react-native-paper';
import { renderInputToolbar, renderActions, renderComposer, renderSend, renderMessageVideo, renderMessageAudio } from '../components/InputToolBar';
import { FontAwesome } from '@expo/vector-icons'; 
import { AUDIO_MSG_MODE, VIDEO_MSG_MODE, CONSULTATION } from '../constants/chatConstants';
import AudioRecord from '../components/AudioRecord';
import { addAudioVideo } from '../utils/browseImgVideoUtil';
import { useDispatch, useSelector } from 'react-redux';
import { saveChatMsgRequest, getChatMessageReq, sendChatMsg } from '../actions/consultAction';
import { consultationImgUpload, uploadAudio, videoUpload } from '../api/consultApi';
import ChatRenderImage from '../components/ChatRenderImage';


function buildMsg(props, audioMsg){

  const msg =  new IMessage()
  
  return {
    _id: 1,
    text: '',
    createdAt: new Date(),
    user: {
      ...props.user
    },
    audio: audioMsg
  }
}

export default function ChatScreen({ navigation }) {
  // 
 

  const [visible, setVisible] = React.useState(false);
  const [modalMode, setModalMode] = React.useState('');
  const hideModal = ()=>(setVisible(false));
  const [audioMsg, setAudioMsg] = React.useState('');
  const dispatch = useDispatch();

  const {user, consultationObj, chatMsgs, ...consultReducer} = useSelector(({consultReducer})=>{
    consultReducer.user = {
      _id: 1
    }
    return consultReducer
})
 

  useEffect(() => {

    console.log(' useEffect ')

    dispatch(getChatMessageReq(consultationObj))
    
  }, [])

  
  const messages = chatMsgs || [];
  console.log(' #messages--------', messages)
  console.log(' #messages chatMsgs--------', chatMsgs)
  const onSend = (inpMsg = []) => {

    console.log(' inpMsg ', inpMsg)
    console.log(' chatMsgs chatMsgs ', chatMsgs)

    dispatch(sendChatMsg(GiftedChat.append(chatMsgs, inpMsg)))
    dispatch(saveChatMsgRequest({ id: consultationObj.id, ...inpMsg}))
  }
  
  /*useCallback((inpMsg = []) => {

    console.log(' inpMsg ', inpMsg)
    console.log(' chatMsgs chatMsgs ', chatMsgs)

    // console.log(' GiftedChat.append(inpMsg, messages) ', GiftedChat.append(inpMsg, messages))
    // console.log(' GiftedChat.append(inpMsg, messages) 22 ', GiftedChat.append(chatMsgs, inpMsg))
    dispatch(sendChatMsg(chatMsgs.concat(inpMsg)))
    // dispatch(saveChatMsgRequest({ id: consultationObj.id, ...inpMsg}))
  }, [])*/

  const getAudioMsgComp = () =>{
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
      <>
      <AudioRecord startRecordIcon={startRecord} recordingIcon={recordingIcon} recordCallback={recordCallback}/>
      </>
     
    );
  }
 
  const recordCallback =(recording)=>{
    hideModal()
    setAudioMsg(recording)

    let audioMsg = {
      _id: Math.round(Math.random() * 1000000),
      text: '',
      createdAt: new Date(),
      user: user,
      audio: recording,
      file : recording
    }

    audioMsg.pathUrl = CONSULTATION+`/${consultationObj.id}/chat/${audioMsg._id}/audio`;
    
    uploadAudio({file: recording, pathUrl: CONSULTATION+`/${consultationObj.id}/chat/${audioMsg._id}/audio`})

    onSend(audioMsg)
  }

const addAudioVideoClbk = (mimeType, result, errmsg)=>{

  console.log(' add image video call back')

  let msg = {
    _id: Math.round(Math.random() * 1000000),
    text: '',
    createdAt: new Date(),
    user: user,
  }

  msg.file = result;
  if(mimeType.includes('image')){
    msg.image = result.uri;
    msg.pathUrl = CONSULTATION+`/${consultationObj.id}/chat/${msg._id}/image`;
    consultationImgUpload({file: result, pathUrl: CONSULTATION+`/${consultationObj.id}/chat/${msg._id}/image`})
  } else if(mimeType.includes('video')){
    msg.video = result.uri;
    msg.file = result;
    msg.pathUrl =  CONSULTATION+`/${consultationObj.id}/chat/${msg._id}/video`;
    videoUpload({file: result, pathUrl: CONSULTATION+`/${consultationObj.id}/chat/${msg._id}/video`})
  }
  
  onSend(msg)

}


  return (
    <>
     <Portal>
       <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ {backgroundColor: 'white', padding: 10}}>
        {modalMode==AUDIO_MSG_MODE && getAudioMsgComp()}
       </Modal>
     </Portal>
    <GiftedChat
      audioMsg={audioMsg}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={user}
      renderInputToolbar={renderInputToolbar}
      actionList={
        {
          'Choose File form': () => {
            console.log('Choose From Library');
            setVisible(false)
            addAudioVideo(addAudioVideoClbk)
          },
          'Record Audio': () => {
            console.log('Record Audio');
            setVisible(true)
            setModalMode(AUDIO_MSG_MODE)
          },
          Cancel: () => {
            console.log('Cancel');
          },
        }
      }
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderMessageImage={(props)=> <ChatRenderImage {...props}/>}
      renderMessageVideo={renderMessageVideo}
      renderMessageAudio={renderMessageAudio}
      consultationObj={consultationObj}
      chatUrl={`consultation/${consultationObj.id}/chat/`}
    />
    <KeyboardAvoidingView behavior="height"/>
    </ >
  )
} 