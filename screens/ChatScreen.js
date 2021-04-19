import React, { useState, useCallback, useEffect } from 'react'
import { Text, View, Button, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../components/InputToolBar';

export default function ChatScreen({ navigation }) {
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
    isAnswerd: false
  }]);
  const [currentStep, setCurrentStep] = useState(1);


  useEffect(() => {

    console.log(' useEffect ')

    // if(chatBotMsg.find(ele => ele.step == currentStep).answer){
    //   console.log(' useEffect anser')
    //   const nexStep = chatBotMsg.find(ele => ele.step == currentStep+1);
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, nexStep))
    // }
    
  }, [])
 
  const onSend = useCallback((inpMsg = []) => {

    // const msg = inpMsg.map(ele => {
    //   if(ele.step == currentStep)
    //   {
    //     ele.isAnswerd = true;
    //     return ele;
    //   }   
    //   return ele;   
    // })
    const idx = chatBotMsg.findIndex(ele => ele.step == currentStep);
    chatBotMsg[idx].answer = inpMsg;

    const obj = GiftedChat.append(previousMessages, inpMsg)
  
    const nexStep = chatBotMsg.find(ele => ele.step == currentStep+1);
    setCurrentStep(currentStep+1)
    setMessages(previousMessages => GiftedChat.append(obj, nexStep))
    console.log(' messages ', messages)
  }, [])
 
  return (
    <>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
    />
    <KeyboardAvoidingView behavior="height"/>
    </ >
  )
} 