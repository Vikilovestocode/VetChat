import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar ,  Modal, Portal, HelperText} from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import AudioRecord from './AudioRecord';
import AudioPlayer from './AudioPlayer';
import AddImageVideo from './AddImageVideo';


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

const audioUrl = (base)=>(`${base}\audio`)

const ConsultFormStepTwo = (props) => {
    const [recording, setRecording] = React.useState(null);

 
   
    return (
        <Formik
            initialValues={{ ownerphone: '', owneremail: '',
                        problemDesc: '', audio:'', vacnationimage: '', problemImageVideo: [],
                        isLaziness: '', isVomitting:'', isDiarrhoea: '',diarrhoeaPerDay: '',  vomittingPerDay: ''}}
            validate={validateForm}            
            onSubmit={values => {
                alert(JSON.stringify(values, null, 4))
                console.log(JSON.stringify(values, null, 4))
                
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => {

                const recordCallback = (record) => {
                    formik.setFieldValue('audio', audioUrl(''), true)
                    setRecording(record);
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
                                        keyboardType={"number-pad"}
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
                                    {recording ? <AudioPlayer recording={recording} uploadUrl={"consultaion/audio"} removeRecording={() => (setRecording(null))} /> :
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
                                    <AddImageVideo title={'Add Vaccination Card Image'} limit={1} uploadUrl={'vaccination'} />
                                </View>
                                <View style={styles.padding}>
                                    <AddImageVideo title={'Add Image/Video of Problem'} limit={3} uploadUrl={'someurl'}
                                        removeVideoImageClbk={(url) => (formik.setFieldValue('problemImageVideo', values.problemImageVideo.filter(ele => ele != url), true))}
                                        addVideoImageClbk={(url) => (formik.setFieldValue('problemImageVideo', [...values.problemImageVideo, url], true))} />
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