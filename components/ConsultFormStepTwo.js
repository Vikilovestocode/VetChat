import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar ,  Modal, Portal} from 'react-native-paper';
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

    if(!values.owneremail && !values.ownerphone){
        err.owneremail = 'Required'
    }
    
    if(!values.problemDesc){
        err.problemDesc = 'Required'
    }

    if(!values.weight){
        err.weight = 'Required'
    }

    if(!values.breed)
    {
        err.breed = 'Required'
    }

    console.log('validate form error', err)


    return err;

}



const ConsultFormStepTwo = (props) => {
    const [recording, setRecording] = React.useState(null);

    const recordCallback = (record)=>{ 
        setRecording(record);
    }
   
    return (
        <Formik
            initialValues={{ ownerphone: '', owneremail: '',
                        problemDesc: '', vacnationimage: '', problemImage: [],  problemVideo:[]}}
            validate={validateForm}            
            onSubmit={values => {
                console.log(values)
                
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => (

                <ScrollView style={{flex: 1}}>

                <View >
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
                     {recording? <AudioPlayer recording={recording} uploadUrl={"consultaion/audio"} removeRecording={()=> (setRecording(null))}/>:
                      <AudioRecord recordCallback={recordCallback}/>}
                     </View>
                     <View style={styles.padding}>
                        <AddImageVideo title={'Add Vaccination Card Image'} limit={1} uploadUrl={'vaccination'}/>      
                     </View>
                     <View style={styles.padding}>
                        <AddImageVideo title={'Add Image/Video of Problem'} limit={3} uploadUrl={'someurl'}/>      
                     </View>
                    <View style={styles.padding}>
                     <Button onPress={handleSubmit} title="Submit" />
                    </View>
                
                </View>
                </ScrollView>

            )}

        </Formik>


    );
};


const styles = StyleSheet.create ({
    padding:{ padding: 5},
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