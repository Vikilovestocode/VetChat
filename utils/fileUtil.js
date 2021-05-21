import * as FileSystem from 'expo-file-system';
import firebase from '../firebase.conf';


export async function getfireBaseDloadUrl(filePath){
    const storageRef =  firebase.storage().ref(filePath);
    const url = await storageRef.getDownloadURL();
    return url;
}

export async function createFileLocally(fileUri) {
  const cacheDir = FileSystem.cacheDirectory + fileUri;
  console.log(' createFileLocally:: ', cacheDir)
  const fileInfo = await FileSystem.getInfoAsync(cacheDir);

  let result;
  if (!fileInfo.exists) {
    const dloadUrl = getfireBaseDloadUrl(fileUri);
    console.log("createFileLocally file exist dloadUrl: ", dloadUrl);
    result = await FileSystem.downloadAsync(dloadUrl, fileUri);
  }

  return result;
}


export async function createFileLocallyBfrUpload(file, bucketPrefix) {
  console.log(' createFileLocallyBfrUpload:: ', file, bucketPrefix)
  const cacheDir = FileSystem.cacheDirectory + bucketPrefix;
  console.log(' createFileLocallyBfrUpload:: ', cacheDir)
  const localPath = file.uri? file.uri :file.getURI()
  const fileInfo = await FileSystem.getInfoAsync(cacheDir);

  let result;
  if (!fileInfo.exists) {
    result = await FileSystem.copyAsync({ from: localPath, to: cacheDir  });
    console.log(' createFileLocallyBfrUpload :result: ', result)
  }

  return result;
}
