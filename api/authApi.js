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

export async function signUp(payload){
    console.log('signUp');
    const email = payload.phone+'@some.com';
    const phone = payload.phone;
    const usercrd = await firebase.auth().createUserWithEmailAndPassword(email, phone);

    console.log('signUp usercrd #######', email, phone, usercrd);
}

export async function loginUser(payload){
    console.log('loginUser');
    const email = payload.phone+'@some.com';
    const phone = payload.phone;
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    await firebase.auth().signInWithEmailAndPassword(email, phone)

    console.log('loginUser ###current###',firebase.auth().currentUser);
    console.log('loginUser #######', email, phone);
}