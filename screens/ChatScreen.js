import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, Button, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Portal, Modal } from 'react-native-paper';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolBar';
import { FontAwesome } from '@expo/vector-icons'; 
import { AUDIO_MSG_MODE } from '../constants/chatConstants';
import AudioRecord from '../components/AudioRecord';

export default function ChatScreen({ navigation }) {
  // 
  const chatBotMsg = [
    {
      _id:  1,
      step: 1,
      text: `Hi, This is Lika doctors assistant. Please provide awser for the following 
      What is the pet name?
      `,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      isChatbotMsg: true,
      answer: null
    },
    {
      _id: 2,
      step: 2,
      text: 'What type of pet?',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: [
          {
            title: 'Dog',
            value: 'Dog',
          },
          {
            title: 'Bird',
            value: 'Bird',
          },
          {
            title: 'Cat',
            value: 'Cat',
          },
          {
            title: 'Farm Animal',
            value: 'Farm Animal',
          },
        ],
      },
      user: {
        _id: 2,
        name: 'React Native',
      },
    }
  ]
 
  const [messages, setMessages] = useState([ {
    _id:  1,
    step: 1,
    text: `Hi, This is Lika doctors assistant. Please provide awser for the following 

    What is the pet name?
    `,
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    isChatbotMsg: true,
    isAnswerd: false,
    received: true
  }, {
    _id:  2,
    step: 1,
    text: `Hi, Lika
    `,
    createdAt: new Date(),
    user: {
      _id: 1,
    },
    isChatbotMsg: true,
    isAnswerd: false,
    received: true
  }]);
  const [currentStep, setCurrentStep] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const [modalMode, setModalMode] = React.useState('');
  const hideModal = ()=>(setVisible(false));
  const [audioMsg, setAudioMsg] = React.useState('');


  useEffect(() => {

    console.log(' useEffect ')

    // if(chatBotMsg.find(ele => ele.step == currentStep).answer){
    //   console.log(' useEffect anser')
    //   const nexStep = chatBotMsg.find(ele => ele.step == currentStep+1);
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, nexStep))
    // }

    
  }, [])
 
  const onSend = useCallback((inpMsg = []) => {

    console.log(' messages ', inpMsg)
    setMessages(previousMessages => GiftedChat.append(previousMessages, inpMsg))
  }, [])

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
        <Text>Recording...</Text>
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
      user={{
        _id: 1,
      }}
      renderInputToolbar={renderInputToolbar}
      actionList={
        {
          'Choose File form': () => {
            console.log('Choose From Library');
            setVisible(true)
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
    />
    <KeyboardAvoidingView behavior="height"/>
    </ >
  )
} 