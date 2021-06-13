import * as React from 'react';
import { Button, Card, ProgressBar, Colors, ActivityIndicator } from 'react-native-paper';
import { uploadProgress } from '../utils/uploadUtil';
import { consultationImgUpload, uploadAudio, videoUpload } from '../api/consultApi';
import * as mime from 'react-native-mime-types';
import Lightbox from 'react-native-lightbox';
import { useDispatch, useSelector } from 'react-redux';
import { getImageDloadUrlReq } from '../actions/consultAction';
import CachedImage from 'react-native-expo-cached-image';
import { View, Dimensions, Image } from 'react-native';
import AudioPlayer from './AudioPlayer';
import CardVideoPlayer from './CardVideoPlayer';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function PreviewMedia(props) {
    console.log('PreviewMedia', props)
    const [progressCnt, setProgressCnt] = React.useState(0)
    const dispatch = useDispatch();
    
    const progressclbk = (cnt)=>{
        console.log(' progressclbk ', cnt)
        setProgressCnt(cnt)
    }
    
    const errorCallback = ()=>{

    }
    
    const succesCallback = ()=>{

    }
    
    const { currMsgImgUlrMap } = useSelector(({consultReducer})=>{
        return consultReducer
     }) 

    React.useEffect(()=>{
        console.log(' PreviewMedia: ', props)
        if(!props.newUpload){
            dispatch(getImageDloadUrlReq(props.fullPathUrl))
        } else if(progressCnt ==0){ 
            const uri = props.file.uri? props.file.uri :props.file.getURI()
            const fileType = mime.lookup(uri);
            let task;
            console.log("fileType: ",fileType," uri ", uri)
            if(fileType.includes('image')){
                task = consultationImgUpload({file: props.file, pathUrl: props.fullPathUrl})
            }else if(fileType.includes('video')){
                task = videoUpload({file: props.file, pathUrl: props.fullPathUrl})
            }else if(fileType.includes('audio')){
                task = uploadAudio({file: props.file, pathUrl: props.fullPathUrl})
            }
            if(task)
                uploadProgress(task, progressclbk, errorCallback, succesCallback)
            else
                console.log(' task null ', new Error(' task null '))    
        }    
    }, [])

    if(!props.file && !currMsgImgUlrMap[props.fullPathUrl] ){
        return <ActivityIndicator animating={true} color={Colors.red800} />
    }
        console.log('currMsgImgUlrMap[props.fullPathUrl]', currMsgImgUlrMap[props.fullPathUrl], props.file)
  
    if(props.fullPathUrl.includes("audio")){
       return <AudioPlayer uploadUrl={props.fullPathUrl} recording={props.file || currMsgImgUlrMap[props.fullPathUrl] } removeRecording={props.removePreview} />
    } else if(props.fullPathUrl.includes("video")){
        console.log("video render form::::::")
        return <CardVideoPlayer uploadUrl={props.fullPathUrl} videoUri={props.file || currMsgImgUlrMap[props.fullPathUrl] } removeVideo={props.removePreview}/>
    }

    return (
    <Card key={props.fullPathUrl} style={{ padding: 10}}>
        {/* <Card.Cover  style={{  width: 250, height: 150, resizeMode: 'contain', alignSelf: 'flex-end'}} source={props.file? props.file : 
                    { uri: currMsgImgUlrMap[props.fullPathUrl]}} /> */}
        <Card.Content>
        <Lightbox style={{ flexDirection: 'row',justifyContent: 'center'}}>
            <Image
                    style={{ alignSelf: 'center',  width: WINDOW_WIDTH -40, height: 200 }} source={props.file? props.file : 
                        { uri: currMsgImgUlrMap[props.fullPathUrl]}} />
         </Lightbox>       
        </Card.Content>
        {props.newUpload && <ProgressBar progress={progressCnt} color={Colors.red800} />}
        {props.isEditable &&
        <Card.Actions>
            <Button onPress={()=>(props.removePreview(props.fullPathUrl))}>Remove</Button>
        </Card.Actions>}
    </Card>
    );
}