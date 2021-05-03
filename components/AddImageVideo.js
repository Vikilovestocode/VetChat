import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import PreviewImageVideo from './PreviewImageVideo';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as mime from 'react-native-mime-types';
import { addMediaRequest, deleteMediaRequest } from '../actions/consultAction';

export default function AddImageVideo(props) {
  const [media, setMedia] = React.useState({});
  const [count, setCount]  = React.useState(0);
  const dispatch = useDispatch();
  const { mediaTaskList } = useSelector(({ consultReducer })=>{
     return consultReducer;
  })
  const removePreview = ( mapKey )=>{
    console.log('remove clcik', mapKey)
    if(media[mapKey])
    {
      if(props.removeVideoImageClbk)
         props.removeVideoImageClbk(mapKey, media[mapKey])
      dispatch(deleteMediaRequest({pathUrl:mapKey}));
      delete media[mapKey]
      setMedia({...media})
      setCount((prev) => (prev - 1));
    }
    
  }

  const addAudioVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*"});
  
    console.log(result)

    if (result.type !== 'cancel') {
        const fileType = mime.lookup(result.uri);
        let fileUrl = '';
        console.log(' addAudioVideo ', result, fileType)
        if(fileType.includes('image') || fileType.includes('video')){
          if(props.addVideoImageClbk){
            if(fileType.includes('image')){
              fileUrl = props.uploadUrl+"/image/"+count+result.name;
            }

            if(fileType.includes('video')){
              fileUrl = props.uploadUrl+"/video/"+count+result.name;
            }
            props.addVideoImageClbk(fileUrl)

          }
          setMedia((prev)=>{
            prev[fileUrl] = result
            return prev;
          });
          // dispatch(addMediaRequest({file: result, pathUrl:props.uploadUrl+"/"+count}));
          setCount((prev)=>(prev+1));
        } else {
          alert("File type "+result.name+" not allowed")
        }
    }
  }

  // if you pass uploadIcon then no preview available but u get upload img in 
  // addVideoImageClbk

  return (
    <View style={styles.container}>
     {(props.uploadIcon?  props.uploadIcon:
       (count <= props.limit-1) && <View style={styles.addContainer}>
       <TouchableOpacity style={styles.button} onPress={addAudioVideo}>
         <Text style={styles.addLable}>{props.title}</Text>
         <Ionicons name="add-sharp" size={24} color="black" />
       </TouchableOpacity>
     </View>
      )}
      {
        (!props.uploadIcon ?
        <View style={styles.previewContainer}>
        {Object.keys(media).map(key => 
          (<PreviewImageVideo baseUrl={props.uploadUrl} fullPathUrl={key} image={media[key]} removePreview={removePreview}/>))}
        </View> : null)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    paddingTop: 5,
    justifyContent: 'center',
  },  
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  addContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  addLable:{
    paddingRight: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
