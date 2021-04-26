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


export function saveConsultationStep1(payload){
    console.log('saveConsultationStep1', payload);

    const consultations = firebase.firestore().collection("consultations")
    .doc().set(payload);
    // consultations.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });


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
    const response = await fetch(file.uri);
    const blob = await response.blob();
    return blob;
}
 function uploadImage(file, pathUrl) {
    // Create the file metadata
    const metadata = {
        contentType: 'image/*'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask =  firebase.storage().ref().child(pathUrl).put(getDocUrl(file));
    // Pause the upload
    // uploadTask.pause();
    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
    //     var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    //     console.log('uploadTask uploadTask progress:',percent + "% done");
    //     progressCnt(pathUrl, uploadTask, percent)
    //   });
   console.log('#### upload image ##', uploadTask);
   return uploadTask;
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