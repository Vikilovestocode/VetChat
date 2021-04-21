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

    // const consultations = firebase.firestore().collection("consultations").doc("JvRQ5OkZEpb15hQL9SpV");
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
    return uploadImage(media.file, media.pathUrl)
}


function uploadImage(file, pathUrl) {
    // Create the file metadata
    var metadata = {
        contentType: 'image/*'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = firebase.storage().ref().child(pathUrl + file.name).put(file, metadata);

   return uploadTask;
}
