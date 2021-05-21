import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import * as mime from 'react-native-mime-types';

// export default function BrowseImgVideoHook(props) {
//   const [media, setMedia] = React.useState({});
//   const [count, setCount]  = React.useState(0);
//   const dispatch = useDispatch();
//   const { mediaTaskList } = useSelector(({ consultReducer })=>{
//      return consultReducer;
//   })
//   const removePreview = ( mapKey )=>{
//     console.log('remove clcik', mapKey)
//     if(media[mapKey])
//     {
//       if(props.removeVideoImageClbk)
//          props.removeVideoImageClbk(mapKey, media[mapKey])
//       dispatch(deleteMediaRequest({pathUrl:mapKey}));
//       delete media[mapKey]
//       setMedia({...media})
//       setCount((prev) => (prev - 1));
//     }
    
//   }

//   const addAudioVideo = async () => {
//     let result = await DocumentPicker.getDocumentAsync({ type: "*/*"});
  
//     console.log(result)

//     if (result.type !== 'cancel') {
//         const fileType = mime.lookup(result.uri);
//         let fileUrl = '';
//         console.log(' addAudioVideo ', result, fileType)
//         if(fileType.includes('image') || fileType.includes('video')){
//           if(props.addVideoImageClbk){
//             if(fileType.includes('image')){
//               fileUrl = props.uploadUrl+"/image/"+count+result.name;
//             }

//             if(fileType.includes('video')){
//               fileUrl = props.uploadUrl+"/video/"+count+result.name;
//             }
//             props.addVideoImageClbk(fileUrl)

//           }
//           setMedia((prev)=>{
//             prev[fileUrl] = result
//             return prev;
//           });
//           // dispatch(addMediaRequest({file: result, pathUrl:props.uploadUrl+"/"+count}));
//           setCount((prev)=>(prev+1));
//         } else {
//           alert("File type "+result.name+" not allowed")
//         }
//     }
//   }

//   // if you pass uploadIcon then no preview available but u get upload img in 
//   // addVideoImageClbk

//   return null;
// }


export const addAudioVideo = async (addVideoImageClbk) => {
  let result = await DocumentPicker.getDocumentAsync({ type: "*/*"});

  console.log('addAudioVideo----:',result)

  if (result.type !== 'cancel') {
      const fileType = mime.lookup(result.uri);
      console.log(' addAudioVideo util ', result, fileType)
     
      if(fileType.includes('image') || fileType.includes('video')){
        console.log(' addAudioVideo util ', addVideoImageClbk)
        if(addVideoImageClbk){
          addVideoImageClbk(fileType, result)
        }
        
      } else {
        addVideoImageClbk(null, null,"File type "+result.name+" not allowed")
      }
  }
}
