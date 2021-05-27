import firebase from '../firebase.conf';


export async function getUserByPhoneNo(payload){
    console.log('saveUser');
    const allDocs = await firebase.firestore().collection("users")
    .where('phone','==',payload.phone).get();
    console.log('getUserByPhoneNo allDocs',  allDocs && allDocs.docs[0]);
    const user = allDocs && allDocs.docs[0]? allDocs.docs[0]: null;
    console.log('getUserByPhoneNo #######', user);
    if(user){
          return { id: user.id,  ...user.data()}
      } else {
          return null;
      }  

    return user


}


export async function saveUser(payload){
    console.log('saveUser');

    const user = await firebase.firestore().collection("users").add(payload);

    console.log('saveUser #######', user);

    return user


}