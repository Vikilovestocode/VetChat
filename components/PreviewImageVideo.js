import * as React from 'react';
import { Button, Card, ProgressBar, Colors } from 'react-native-paper';
import { uploadProgress } from '../utils/uploadUtil';
import { consultationImgUpload } from '../api/consultApi';


export default function PreviewImageVideo(props) {
    console.log('PreviewImageVideo', props)
    const [progressCnt, setProgressCnt] = React.useState(0)
    
    const progressclbk = (cnt)=>{
        console.log(' progressclbk ', cnt)
        setProgressCnt(cnt)
    }
    
    const errorCallback = ()=>{

    }
    
    const succesCallback = ()=>{

    }

    React.useEffect(()=>{
        if(progressCnt < 1){ 
            const task = consultationImgUpload({file: props.image, pathUrl: props.fullPathUrl})
            uploadProgress(task, progressclbk, errorCallback, succesCallback)
        }    
    }, [])
    return (
    <Card key={props.fullPathUrl}>
        <Card.Cover source={props.image} />
        <ProgressBar progress={progressCnt} color={Colors.red800} />
        <Card.Actions>
            <Button onPress={()=>(props.removePreview(props.fullPathUrl))}>Remove</Button>
        </Card.Actions>
    </Card> );
}