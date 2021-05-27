import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar ,  Modal, Portal, HelperText} from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import AudioRecord from './AudioRecord';
import AudioPlayer from './AudioPlayer';
import AddImageVideo from './AddImageVideo';
import { addPetRequest } from '../actions/consultAction';
import { useDispatch, useSelector } from 'react-redux';
import { addConsltStep2Request } from '../actions/consultAction';
import { consultationImgUpload } from '../api/consultApi';

const CONSULTATION = 'consultation';
const validateForm = (values)=>{
    let err = {};
    

    if(!values.ownerphone){
        err.ownerphone = 'Required'
    }
    
    if(!values.problemDesc){
        err.problemDesc = 'Required'
    }

    if(values.problemImageVideo && values.problemImageVideo.length == 0){
        err.problemImageVideo = 'Add Image or Video'
    }

    console.log('validate form error', err)


    return err;

}


const getInitialValues = (exiting) => {
    const { ownerphone, owneremail,
    problemDesc, audio, vacnationImage, problemImageVideo, problemImages, problemVideos,
    isLaziness, isVomitting, isDiarrhoea,diarrhoeaPerDay,  vomittingPerDay} = exiting;

    if (exiting)
        return {
            ownerphone, owneremail,
            problemDesc, audio, vacnationImage, problemImageVideo, problemImages, problemVideos,
            isLaziness, isVomitting, isDiarrhoea, diarrhoeaPerDay, vomittingPerDay
        };
    else
        return {
            ownerphone: '', owneremail: '',
            problemDesc: '', audio: '', vacnationImage: '', problemImageVideo: [], problemImages: [], problemVideos: [],
            isLaziness: '', isVomitting: '', isDiarrhoea: '', diarrhoeaPerDay: '', vomittingPerDay: ''
        };
}


const audioUrl = (base)=>(`${base}/audio`)

const ConsultFormStepTwo = (props) => {
    const [recording, setRecording] = React.useState(null);
    const dispatch = useDispatch();
    let { consultationObj } = useSelector(({consultReducer})=>{
        return consultReducer
    })

   
    return (
        <Formik
            initialValues={getInitialValues(consultationObj)}
            validate={validateForm}            
            onSubmit={values => {
                // alert(JSON.stringify(values, null, 4))
                console.log(JSON.stringify(values, null, 4))
                dispatch(addConsltStep2Request({...values, id: consultationObj.id}))
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => {

                const recordCallback = (record) => {
                    formik.setFieldValue('audio', audioUrl(CONSULTATION+`/${consultationObj.id}`), true)
                    consultationImgUpload({file: record, pathUrl: audioUrl(CONSULTATION+`/${consultationObj.id}`)})
                    setRecording(record);
                }

                const addVideoImageClbk = (url)=>{
                    console.log('addVideoImageClbk', url)
                    formik.setFieldValue('problemImageVideo', [...values.problemImageVideo, url], true)
                    
                    if(url.includes('image')){
                            formik.setFieldValue('problemImages', [...values.problemImages, url], true)
                    } else {
                        formik.setFieldValue('problemVideos', [...values.problemVideos, url], true)
                    }
                }

               const removeVideoImageClbk = (url)=>{
                    console.log('removeVideoImageClbk', url)
                    formik.setFieldValue('problemImageVideo', values.problemImageVideo.filter(ele => ele != url), true)
                    if(url.includes('image')){
                        formik.setFieldValue('problemImages', values.problemImages.filter(ele => ele != url), true)
                    } else {
                        formik.setFieldValue('problemVideos', values.problemVideos.filter(ele => ele != url), true)
                    }
            }

                return (
                    <>
                        {   console.log(JSON.stringify(values, null, 4))}
                        <ScrollView style={{ flex: 1 }}>

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
                                    />
                                    {errors.problemDesc && touched.problemDesc ?
                                        (<Text style={{ color: 'red' }}>{errors.problemDesc}</Text>) : null}
                                </View>
                                 <View style={styles.padding}>
                                    {recording ? <AudioPlayer recording={recording} uploadUrl={audioUrl(CONSULTATION+`/${consultationObj.id}`)} removeRecording={() => (setRecording(null))} /> :
                                        <AudioRecord recordCallback={recordCallback} />}
                                </View>
                                <View>
                                    <View>
                                        <Checkbox.Item label="Is dog showing laziness" status={values.isLaziness ?
                                            "checked" : ""} onPress={() => (
                                                formik.setFieldValue('isLaziness', !values.isLaziness, true))} />
                                    </View>
                                </View>
                                <View style={styles.padding}>
                                    <View>
                                        <Checkbox.Item label="Is dog vomitting" status={values.isVomitting ?
                                            "checked" : ""} onPress={() => (
                                                formik.setFieldValue('isVomitting', !values.isVomitting, true))} />
                                    </View>

                                    <TextInput
                                        mode='outlined'
                                        label="No of time vomitting in 24hr"
                                        keyboardType={"number-pad"}
                                        onChangeText={handleChange('vomittingPerDay')}
                                        onBlur={handleBlur('vomittingPerDay')}
                                        value={values.vomittingPerDay}
                                        error={errors.vomittingPerDay && touched.vomittingPerDay}
                                    />
                                </View>
                                <View style={styles.padding}>
                                    <View>
                                        <Checkbox.Item label="Is Diarrhoea/ Loose motion" status={values.isDiarrhoea ?
                                            "checked" : ""}
                                            onPress={() => (formik.setFieldValue('isDiarrhoea', !values.isDiarrhoea, true))}
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
                                    />
                                </View>
                                <View style={styles.padding}>
                                    <AddImageVideo title={'Add Vaccination Card Image'} limit={1} uploadUrl={CONSULTATION+`/${consultationObj.id}`+'/vaccination'} 
                                                                            addVideoImageClbk={(url) => (formik.setFieldValue('vacnationImage', url, true))}
                                                                            removeVideoImageClbk={(url) => (formik.setFieldValue('vacnationImage', '', true))} />
                                </View>
                                <View style={styles.padding}>
                                    <AddImageVideo title={'Add Image/Video of Problem'} limit={3} uploadUrl={CONSULTATION+`/${consultationObj.id}`}
                                        removeVideoImageClbk={removeVideoImageClbk}
                                        addVideoImageClbk={addVideoImageClbk} />
                                    {errors.problemImageVideo && touched.problemImageVideo ?
                                        (<Text style={{ color: 'red' }}>{errors.problemImageVideo}</Text>) : null}
                                </View>

                            </View>
                        </ScrollView>
                        <View style={styles.padding}>
                            <Button onPress={handleSubmit} title="Submit" />
                        </View>
                    </>
                )

            }}

        </Formik>

    );
};


const styles = StyleSheet.create ({
    padding:{ padding: 5},
    submitBtn:{ padding: 5},
    breed:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF7F6'
    },
    age:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    petavatar:{
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
       fontSize : 20,
       marginBottom: 10
    }
 
 })

export default ConsultFormStepTwo;