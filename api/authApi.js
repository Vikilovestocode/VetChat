
export async function saveUser(payload){
    console.log('saveUser');

    const user = await firebase.firestore().collection("users").add(payload);

    console.log('saveUser #######', user);

    return user


}