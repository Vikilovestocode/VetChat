import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { navMap } from '../navigation/navConstant';
import { List, Divider } from 'react-native-paper';

import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { getConsultationsReq, viewConsultation } from '../actions/consultAction';
import { useDispatch, useSelector } from 'react-redux';
import { Chip } from 'react-native-paper';

export default function ConsultationListScreen({ navigation, route }) {
  
  const dispatch = useDispatch();

  const { consultList, authReducer } = useSelector(({ consultList, authReducer }) => {
    console.log(' consultList useselector :::: ', consultList)

    console.log(' consultList user :::: ', authReducer)
    return { consultList, authReducer };
  })

  useEffect(()=>{
    if(!consultList.consultList)
        dispatch(getConsultationsReq(authReducer.user))
  }, []);

  const viewConsultScreen = (consult)=>{

    dispatch(viewConsultation(consult))
    navigation.navigate(navMap.consultationStep1)
  }

  const chatScreen = (consult)=>{

    dispatch(viewConsultation(consult))
    navigation.navigate(navMap.chat)
  }
  
  const list =  consultList.consultList;

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={{ paddingTop: 10 }}> 
        
     {
       list && list.map(
         (consultObj, i)=>(
           <>
             <Card key={consultObj.id}>
               {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
               <Card.Content>
                 <Title>{'Consultation on '+consultObj.createdAt.toDate().toDateString()}</Title>
                 <Paragraph>{(consultObj.problemDesc|| 'No Description Given')}</Paragraph>
                 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                 {consultObj.isDiarrhoea && <Chip>Diarrhoea</Chip>}
                 {consultObj.isVomitting && <Chip>Vomitting</Chip>}
                 {consultObj.isLaziness && <Chip>Laziness</Chip>}
                 </View>
               </Card.Content>
               <Card.Actions>
                 <Button onPress={()=>(viewConsultScreen(consultObj))}>View</Button>
                 <Button onPress={()=>(chatScreen(consultObj))}>Chat</Button>
               </Card.Actions>
             </Card>
            { i < list.length -1 && <Divider/> }
           
            {/* <List.Section>
              <List.Item  title={(<Text>{'Consultation on '+consultObj.createdAt.toDate().toDateString()}</Text>)}  description={consultObj.problemDesc} descriptionNumberOfLines={2}/>
            </List.Section>
            */}
           </> 
         ))
     }     
    </View>
     </ScrollView>
  );
}



const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});