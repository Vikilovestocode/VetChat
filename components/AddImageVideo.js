import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import PreviewImageVideo from './PreviewImageVideo';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addMediaRequest, deleteMediaRequest } from '../actions/consultAction';

export default function AddImageVideo(props) {
  const [media, setMedia] = React.useState({});
  const [count, setCount]  = React.useState(0);
  const dispatch = useDispatch();
  const { mediaTaskList } = useSelector(({ consultReducer })=>{
     return consultReducer;
  })
  console.log('mediaTaskList mediaTaskList:',mediaTaskList)
  const removePreview = ( mapKey )=>{
    console.log('remove clcik', mapKey)
    if(media[mapKey])
    {
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
       //props.
        setMedia((prev)=>{
          prev[props.uploadUrl+"/"+count+result.name] = result
          return prev;
        });
        // dispatch(addMediaRequest({file: result, pathUrl:props.uploadUrl+"/"+count}));
        setCount((prev)=>(prev+1));
    }
  }

  return (
    <View style={styles.container}>
     { (count <= props.limit-1) && <View style={styles.addContainer}>
        <TouchableOpacity style={styles.button} onPress={addAudioVideo}>
          <Text style={styles.addLable}>{props.title}</Text>
          <Ionicons name="add-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>}
      <View style={styles.previewContainer}>
        {Object.keys(media).map(key => 
          (<PreviewImageVideo baseUrl={props.uploadUrl} fullPathUrl={key} image={media[key]} removePreview={removePreview}/>))}
      </View>
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
