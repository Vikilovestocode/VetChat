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
import withSpinner from '../components/WithSpinner';

export default function ConsultationListScreen({ navigation, route }) {
  
  const dispatch = useDispatch();

  const { consultList, authReducer } = useSelector(({ consultList, authReducer }) => {
    console.log(' consultList useselector :::: ', consultList? consultList.length: 0 )

    console.log(' consultList user :::: ', authReducer)
    return { consultList, authReducer };
  })

  const { loading } = consultList;

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
          if(!authReducer.user)
              navigation.navigate(navMap.signup)
      });

      return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    console.log(' consultList consultList use effect :::: ', consultList? consultList.length: 0 )
    // if(!consultList.consultList)
        dispatch(getConsultationsReq(authReducer.user))
  }, []);

  const viewConsultScreen = (consult, isEdit=false)=>{

    dispatch(viewConsultation({consult, isEdit}))
    navigation.navigate(navMap.consultationStep1)
  }

  const chatScreen = (consult)=>{

    dispatch(viewConsultation({consult, isEdit: false}))
    console.log(' chatScreen ', consult)
    navigation.navigate(navMap.chat, {
      consultationObj: consult
    })
  }
  
  const list =  consultList.consultList;

  const ScrollViewWithSpinner = withSpinner(View);

  return (
    <ScrollViewWithSpinner isLoading={loading} style={{ flex: 1 }}>
    <ScrollView>
    <View style={{ paddingTop: 10 }}>     
     {
        !list && (<Text>No Consultation</Text>)
     }
     { 
       list && list.map(
         (consultObj, i)=>(
           <View key={consultObj.id}>
             <Card >
               {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
               <Card.Content>
                 <Title>{'Consultation on '+consultObj.createdAt?.toDate().toDateString()}</Title>
                 <Paragraph>{(consultObj.problemDesc|| 'No Description Given')}</Paragraph>
                 {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                 {consultObj.isDiarrhoea && <Chip>Diarrhoea</Chip>}
                 {consultObj.isVomitting && <Chip>Vomitting</Chip>}
                 {consultObj.isLaziness && <Chip>Laziness</Chip>}
                 </View> */}
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
           </View> 
         ))
     }     
    </View>
     </ScrollView>
     <View>
        <Button onPress={()=>(viewConsultScreen(null, true))}>New Consultation</Button>
     </View>
     </ScrollViewWithSpinner>
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