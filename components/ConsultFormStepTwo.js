import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar, Modal, Button, HelperText, ToggleButton, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import AudioRecord from './AudioRecord';
import AudioPlayer from './AudioPlayer';
import AddImageVideo from './AddImageVideo';
import { addPetRequest, deleteMediaRequest } from '../actions/consultAction';
import { useDispatch, useSelector } from 'react-redux';
import { addConsltStep2Request } from '../actions/consultAction';
import { consultationImgUpload } from '../api/consultApi';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { addAudioVideo } from '../utils/browseImgVideoUtil';
import AudioModal from './AudioRecordModal';
import PreviewMedia from './PreviewMedia';
import withSpinner from './WithSpinner';
import OverlapLoading from './OverlapLoading';
import { useEffect } from 'react';
import { navMap } from '../navigation/navConstant';


const CONSULTATION = 'consultation';
const validateForm = (values) => {
    let err = {};


    if (!values.ownerphone) {
        err.ownerphone = 'Required'
    }

    if (!values.problemDesc) {
        err.problemDesc = 'Required'
    }

    if (values.problemImageVideo && values.problemImageVideo.length == 0) {
        err.problemImageVideo = 'Add Image or Video'
    }

    console.log('validate form error', err)


    return err;

}


const getInitialValues = (exiting, user) => {

    if (exiting)
        return {...exiting};
    else
        return {
            ownerphone: user.phone, owneremail: user.email || '',
            problemDesc: '', audio: [], vacnationImage: '', problemImageVideo: [], problemImages: [], problemVideos: [],
            isLaziness: '', isVomitting: '', isDiarrhoea: '', diarrhoeaPerDay: '', vomittingPerDay: '', status: 'Complete' 
        };
}


const audioUrl = (base) => (`${base}/audio`)

const ConsultFormStepTwo = (props) => {
    const [recording, setRecording] = React.useState(null);
    const [attachments, setAttachments] = React.useState(null);
    const [urlFileMap, setUrlFileMap] = React.useState({});
    const previewList = Object.keys(urlFileMap).length? urlFileMap: props.problemImageVideo;
    const dispatch = useDispatch();
    let { consultationObj, newconsultationObj, isEdit, loading, redirectToChat } = useSelector(({ consultReducer }) => {
        return consultReducer
    })

    const { user } = useSelector(({ authReducer })=> (authReducer))

    const consultationObject = newconsultationObj || consultationObj;

    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);

    useEffect(()=>{
        if(redirectToChat){
            props.navigation.navigate(navMap.chat)
        }
    },[redirectToChat])

    return (
        <Formik
            initialValues={getInitialValues(consultationObj || null, user)}
            validate={validateForm}
            onSubmit={values => {
                // alert(JSON.stringify(values, null, 4))
    
                dispatch(addConsltStep2Request({ ...values, userId: user.id, id: consultationObject.id }))
            }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => {

                const recordCallback = (record) => {
                    hideDialog()
                    const count = values.problemImageVideo.length;
                    const url = audioUrl(CONSULTATION + `/${consultationObject.id}`)+`/`+count;
                    // formik.setFieldValue('audio', audioUrl(CONSULTATION + `/${consultationObject.id}`), true)
                    consultationImgUpload({ file: record, pathUrl: url  })
                    // setRecording(record);
                    setFileAttachments(url, record)
                    formik.setFieldValue('audio', [...values.audio, url], true)
                }

                const addVideoImageClbk = (fileType, result) => {
                    const count = values.problemImageVideo.length;
                    let url = CONSULTATION + `/${consultationObject.id}`+"/image/"+count+result.name;
                    console.log('addVideoImageClbk', url)
                    
                    if (fileType.includes('image')) {
                        formik.setFieldValue('problemImages', [...values.problemImages, url], true)
                    } 
                    if (fileType.includes('video')) {
                        url = CONSULTATION + `/${consultationObject.id}`+"/video/"+count+result.name;
                        formik.setFieldValue('problemVideos', [...values.problemVideos, url], true)
                    }
                    // formik.setFieldValue('problemImageVideo', [...values.problemImageVideo, url], true)
                    // const tempobj = {};
                    // tempobj[url] = result;
                    // setUrlFileMap(prev => ({ ...prev, ...tempobj}))
                    setFileAttachments(url, result)
                }

                const setFileAttachments = (url, file)=>{
                    formik.setFieldValue('problemImageVideo', [...values.problemImageVideo, url], true)
                    const tempobj = {};
                    tempobj[url] = file;
                    setUrlFileMap(prev => ({ ...prev, ...tempobj}))
                }

                const removeVideoImageClbk = (url) => {
                    console.log('removeVideoImageClbk', url)
                    formik.setFieldValue('problemImageVideo', values.problemImageVideo.filter(ele => ele != url), true)
                    if (url.includes('image')) {
                        formik.setFieldValue('problemImages', values.problemImages.filter(ele => ele != url), true)
                    } else  if (url.includes('video'))  {
                        formik.setFieldValue('problemVideos', values.problemVideos.filter(ele => ele != url), true)
                    } else {
                        formik.setFieldValue('audio', values.audio.filter(ele => ele != url), true)
                    }
                    const tempobj = {...urlFileMap};
                    if(tempobj[url])
                        delete tempobj[url];
                    setUrlFileMap(prev => (tempobj))
                    dispatch(deleteMediaRequest({pathUrl:url}));
                }

                const getPreview = ()=>{
                    console.log(" get preview new urlFileMap: ",urlFileMap)

                    console.log(" get preview new upload: ",(!consultationObj || !consultationObj.problemImageVideo.length)
                    && Object.keys(urlFileMap).length)

                    console.log(" get preview old upload: ", (consultationObj && consultationObj.problemImageVideo.length))

                    if((!consultationObj || !consultationObj.problemImageVideo.length)
                    && Object.keys(urlFileMap).length){
                        return Object.keys(urlFileMap)
                                .map((fullUrl) => 
                                        (<PreviewMedia fullPathUrl={fullUrl} file={urlFileMap[fullUrl]} newUpload={true} isEditable={true} removePreview={removeVideoImageClbk}/>));     
                    } else if((consultationObj && consultationObj.problemImageVideo.length)) {
                        return consultationObj.problemImageVideo.map((fullUrl)=> 
                            (<PreviewMedia fullPathUrl={fullUrl} newUpload={false} isEditable={isEdit} removePreview={isEdit? removeVideoImageClbk: null}/>))
                    } 

                    return (<></>);
                    
                }

                // const ViewWithSpinner = withSpinner(View);

                return (
                    <>
                        <ScrollView style={{ flex: 1 }}>
                            <OverlapLoading isLoading={loading} />
                            <View>
                                <View style={styles.padding}>

                                    <TextInput
                                        mode='outlined'
                                        label="Owner ContactNo"
                                        keyboardType={"number-pad"}
                                        onChangeText={handleChange('ownerphone')}
                                        onBlur={handleBlur('ownerphone')}
                                        value={values.ownerphone}
                                        error={errors.ownerphone && touched.ownerphone}
                                        maxLength={10}
                                        disabled={!isEdit}
                                    />
                                    {errors.ownerphone && touched.ownerphone ?
                                        (<Text style={{ color: 'red' }}>{errors.ownerphone}</Text>) : null}
                                </View>
                                <View style={styles.padding}>

                                    <TextInput
                                        mode='outlined'
                                        label="Owner Email"
                                        onChangeText={handleChange('owneremail')}
                                        onBlur={handleBlur('owneremail')}
                                        value={values.owneremail}
                                        error={errors.owneremail && touched.owneremail}
                                        disabled={!isEdit}
                                    />
                                    {errors.owneremail && touched.owneremail ?
                                        (<Text style={{ color: 'red' }}>{errors.owneremail}</Text>) : null}
                                </View>
                                <View style={styles.padding}>

                                    <TextInput
                                        mode='outlined'
                                        label="Describe the Problem"
                                        onChangeText={handleChange('problemDesc')}
                                        onBlur={handleBlur('problemDesc')}
                                        value={values.problemDesc}
                                        error={errors.problemDesc && touched.problemDesc}
                                        multiline={true}
                                        numberOfLines={4}
                                        disabled={!isEdit}
                                    />
                                    {errors.problemDesc && touched.problemDesc ?
                                        (<Text style={{ color: 'red' }}>{errors.problemDesc}</Text>) : null}
                                </View>
                                <View>
                                    <View>
                                        <Checkbox.Item label="Is dog showing laziness" status={values.isLaziness ?
                                            "checked" : ""} onPress={() => {
                                                if(isEdit)
                                                    formik.setFieldValue('isLaziness', !values.isLaziness, true)
                                                }} />
                                    </View>
                                </View>
                                <View style={styles.padding}>
                                    <View>
                                        <Checkbox.Item label="Is dog vomitting" status={values.isVomitting ?
                                            "checked" : ""} onPress={() => {
                                                if(isEdit)
                                                    formik.setFieldValue('isVomitting', !values.isVomitting, true)
                                                }} />
                                    </View>

                                    <TextInput
                                        mode='outlined'
                                        label="No of time vomitting in 24hr"
                                        keyboardType={"number-pad"}
                                        onChangeText={handleChange('vomittingPerDay')}
                                        onBlur={handleBlur('vomittingPerDay')}
                                        value={values.vomittingPerDay}
                                        error={errors.vomittingPerDay && touched.vomittingPerDay}
                                        disabled={!isEdit}
                                    />
                                </View>
                                <View style={styles.padding}>
                                    <View>
                                        <Checkbox.Item label="Is Diarrhoea/ Loose motion" status={values.isDiarrhoea ?
                                            "checked" : ""}
                                            onPress={() => {
                                                if(isEdit)  
                                                    formik.setFieldValue('isDiarrhoea', !values.isDiarrhoea, true)
                                        }}
                                        />
                                    </View>

                                    <TextInput
                                        mode='outlined'
                                        label="No of time Diarrhoea/ Loose motion in 24hr"
                                        keyboardType={"number-pad"}
                                        onChangeText={handleChange('diarrhoeaPerDay')}
                                        onBlur={handleBlur('diarrhoeaPerDay')}
                                        value={values.diarrhoeaPerDay}
                                        error={errors.diarrhoeaPerDay && touched.diarrhoeaPerDay}
                                        disabled={!isEdit}
                                    />
                                </View>
                                <View style={styles.padding}>
                                    {/* {recording ? 
                                <AudioPlayer recording={recording} uploadUrl={audioUrl(CONSULTATION+`/${consultationObject.id}`)} removeRecording={() => (setRecording(null))} /> :
                                <AudioRecord recordCallback={recordCallback} containerStyle={{}} startRecordIcon={()=>(
                                    <FontAwesome name="microphone" size={30} color="black" />
                                )} recordingIcon={()=>(
                                    <FontAwesome name="microphone" size={30} color="green" />
                                )}/>} */}
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }} >
                                       {
                                        //    !recording && 
                                        //    (
                                        //         <Button  disabled={!isEdit} icon={() => (<>
                                        //             {recording ? <FontAwesome name="microphone" size={30} color="black" /> : (<FontAwesome name="microphone" size={30} color="green" />)}
                                        //         </>
                                        //         )} onPress={() =>(setVisible(true))}>
                                        //             Record Audio
                                        //         </Button>
                                        //    )
                                        <Button  disabled={!isEdit} icon={() => (<>
                                            {recording ? <FontAwesome name="microphone" size={30} color="black" /> : (<FontAwesome name="microphone" size={30} color="green" />)}
                                        </>
                                        )} onPress={() =>(setVisible(true))}>
                                            Record Audio
                                        </Button>
                                       }
                                        <Button  disabled={!isEdit} icon={() => (
                                            <FontAwesome name="file-picture-o" size={30} color="black" />
                                        )} onPress={() => (addAudioVideo(addVideoImageClbk))}>
                                            Add Image/Video
                                                </Button>

                                    </View>
                                </View>
                                <View>
                                    <AudioModal recordCallback={recordCallback} hideDialog={hideDialog} visible={visible}/>
                                </View>
                                <View style={styles.padding}>
                                   {getPreview()}
                                </View>
                                {/* <View style={styles.padding}>
                                    <AddImageVideo title={'Add Vaccination Card Image'} limit={1} uploadUrl={CONSULTATION + `/${consultationObject.id}` + '/vaccination'}
                                        addVideoImageClbk={(url) => (formik.setFieldValue('vacnationImage', url, true))}
                                        removeVideoImageClbk={(url) => (formik.setFieldValue('vacnationImage', '', true))} />
                                </View>
                                <View style={styles.padding}>
                                    <AddImageVideo title={'Add Image/Video of Problem'} limit={3} uploadUrl={CONSULTATION + `/${consultationObject.id}`}
                                        removeVideoImageClbk={removeVideoImageClbk}
                                        addVideoImageClbk={addVideoImageClbk} />
                                    {errors.problemImageVideo && touched.problemImageVideo ?
                                        (<Text style={{ color: 'red' }}>{errors.problemImageVideo}</Text>) : null}
                                </View> */}

                            </View>
                        </ScrollView>
                        <View style={styles.padding}>
                            <Button style={styles.button} onPress={handleSubmit} >
                             Submit
                            </Button>
                        </View>
                    </>
                )

            }}

        </Formik>

    );
};


const styles = StyleSheet.create({
    padding: { padding: 3 },
    submitBtn: { padding: 5 },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
    breed: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF7F6'
    },
    age: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    petavatar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2
    },
    title: {
        fontSize: 20,
        marginBottom: 10
    },
    fab: {
        margin: 16,
        bottom: 20,
        right: 0,
        position: 'absolute'
    }

})

export default ConsultFormStepTwo;