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