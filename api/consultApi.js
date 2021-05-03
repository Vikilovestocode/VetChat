import { put } from '@redux-saga/core/effects';
import { addMediaUploadProgress } from '../actions/consultAction';
import firebase from '../firebase.conf';




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

    console.log('saveConsultationStep222222 #######', consultations);

    return payload


}


export function consultationImgUpload(media){
    console.log('consultationImgUpload::', media)
    const task = uploadImage(media.file, media.pathUrl);
    return task;
}

function * progressCnt(pathUrl, data, percent){
    console.log('progressCnt event triggered:')
    yield put(addMediaUploadProgress({pathUrl: pathUrl, task: data, progressCnt: percent}))
}

async function getDocUrl(file){
    console.log('getDocUrl:::', file.uri)
    console.log('getDocUrl:file.getURI()::', file.getURI)
    const response = await fetch(file.uri? file.uri :file.getURI());
    const blob = await response.blob();
    return blob;
}
 async function uploadImage(file, pathUrl) {
   try{

     // Create the file metadata
     const metadata = {
        contentType: 'image/*'
    };

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