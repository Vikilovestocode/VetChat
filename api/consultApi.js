import { put } from '@redux-saga/core/effects';
import { addMediaUploadProgress } from '../actions/consultAction';
import firebase from '../firebase.conf';

import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export function getConsultations(){
    console.log('get all consultations db', !!firebase);

    const consultations = firebase.firestore().collection("consultations").doc("JvRQ5OkZEpb15hQL9SpV");
    consultations.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });


}


export async function saveConsultationStep1(payload){
    console.log('saveConsultationStep1');

    const consultations = await firebase.firestore().collection("consultations").add(payload);

    console.log('saveConsultationStep1 #######', consultations);

    return consultations


}

export async function saveConsultationStepTwo(payload){
    console.log('saveConsultationStepTwo');

    await firebase.firestore().collection("consultations").doc(payload.id)
    .update(payload);


    return payload


}

export async function saveConsultationChat(consultId, msg){
    console.log('saveConsultationChat');

    const {file, ...message} = msg;
  
    const consultation = await firebase.firestore().collection("consultations").doc(consultId).update({
        chat:  firebase.firestore.FieldValue.arrayUnion(message)
    });
  
    console.log(' saveConsultationChat:::  ', consultId, consultation);

    return consultation;

}


export function consultationImgUpload(media){
    console.log('consultationImgUpload::', media)
    const task = uploadImage(media.file, media.pathUrl);
    return task;
}

export function videoUpload(media){
    console.log('consultationImgUpload::', media)
    const task = uploadMedia(media.file, media.pathUrl);
    return task;
}

function * progressCnt(pathUrl, data, percent){
    console.log('progressCnt event triggered:')
    yield put(addMediaUploadProgress({pathUrl: pathUrl, task: data, progressCnt: percent}))
}

export async function getDocUrl(file){
    console.log('getDocUrl:::', file.uri)
    console.log('getDocUrl:file.getURI()::', file.getURI)
    const response = await fetch(file.uri? file.uri :file.getURI());
    const blob = await response.blob();
    return blob;
}
 async function uploadImage(file, pathUrl) {
   try{

    const manipResult = await ImageManipulator.manipulateAsync(
        file.localUri || file.uri,
        [],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

   return uploadMedia(manipResult, pathUrl)

   } catch(e){
    console.log('#### upload image error ##', e);

   }
}

async function uploadMedia(file, pathUrl){
    try{

        console.log('#### uploadMedia callled  ##');
        const data = await getDocUrl(file);
        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask =  firebase.storage().ref().child(pathUrl).put(data);
        // Pause the upload
        // uploadTask.pause();
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
        //     var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        //     console.log('uploadTask uploadTask progress:',percent + "% done");
        //     progressCnt(pathUrl, uploadTask, percent)
        //   });
       return uploadTask;
    
       } catch(e){
        console.log('#### uploadMedia ##', e);
    
       }
}

export async function uploadAudio({file, pathUrl}) {
    try{
 
     const data = await getDocUrl(file);
     // Upload file and metadata to the object 'images/mountains.jpg'
     const uploadTask =  firebase.storage().ref().child(pathUrl).put(data);
     // Pause the upload
     // uploadTask.pause();
     // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
     //     var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
     //     console.log('uploadTask uploadTask progress:',percent + "% done");
     //     progressCnt(pathUrl, uploadTask, percent)
     //   });
    return uploadTask;
 
    } catch(e){
     console.log('#### upload image error ##', e);
 
    }
 }

export async function deleteMedia(payload){
    try{
        console.log(' deleteMedia :payload:', payload)
        await firebase.storage().ref().child(payload.pathUrl).delete();
        return true
    } catch(e){
        console.log('deleteMedia api', e)
        return false
    }
}

export async function getConsultationObj(consultId){
    console.log('getConsultationObj');

  
    const consultation = await firebase.firestore().collection("consultations").doc(consultId).get();
  
    console.log(' getConsultationObj:::  ', consultId, consultation.data());

    return consultation.data();

}

export async function getMediaUrl(payload){
    try{
        console.log(' getMediaUrl :payload:', payload)
        const consultRef = await firebase.storage().ref().child('consultation')
        let tempRef = consultRef;
        payload.split('/').filter(e => e !== 'consultation').forEach(element => {
            tempRef = tempRef.child(element)
        });

        const url = await tempRef.getDownloadURL();

        console.log(' get metat for', url)
        return url
    } catch(e){
        console.log('getMediaUrl api', e)
    }
}
