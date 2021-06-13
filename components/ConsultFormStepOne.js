import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar, Modal, Portal } from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import dogProfile from '../assets/dogProfile.png';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addPetRequest, getImageDloadUrlReq } from '../actions/consultAction';
import { breedList } from '../constants/breedList';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import { ModalList } from './ModalList';
import { consultationImgUpload } from '../api/consultApi';
import { navMap } from '../navigation/navConstant';
import withSpinner from './WithSpinner';
import useIsMounted from '../hooks/UseIsMounted';
import OverlapLoading from './OverlapLoading';


const CONSULTATION = 'consultation';

const validateForm = (values) => {
    let err = {};


    if (!values.petName) {
        err.petName = 'Required'
    }

    if (!values.years && !values.months) {
        err.age = 'Required'
    }

    if (values.months && values.months > 11) {
        err.age = 'Invalid Month'
    }

    if (!values.sex) {
        err.sex = 'Required'
    }

    if (!values.weight) {
        err.weight = 'Required'
    }

    if (!values.breed) {
        err.breed = 'Required'
    }

    console.log('validate form error', err)


    return err;

}

const getInitialValues = (exiting) => {
    // const { petName, years, months, age, sex, weight, isAdopted, breed, petImageUrl } = exiting;
    if (exiting)
        return exiting;
    else
        return { petName: '', years: '', months: '', age: '', sex: '', weight: '', isAdopted: false, breed: '', petImageUrl: '', status: 'InComplete' };
}


const ConsultFormStepOne = (props) => {

    const isMounted = useIsMounted();
    const [petProfileImg, setPetProfileImg] = React.useState(null);

    const dispatch = useDispatch();

    const consultReducer = useSelector(({ consultReducer }) => {
        return consultReducer
    })

    const { currMsgImgUlrMap } = consultReducer;

    const { user } = useSelector(({ authReducer }) => (authReducer))

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10 };
    const { isEdit, loading } = consultReducer;

    return (

        <Formik
            initialValues={getInitialValues(consultReducer.consultationObj)}
            validate={validateForm}
            onSubmit={values => {
                console.log(values)
                if (petProfileImg && petProfileImg.uri) {
                    values.petProfileUri = petProfileImg.uri;
                }
                if (!consultReducer.consultationObj){

                    dispatch(addPetRequest({...values, userId: user.id, createdAt: new Date()}))
                }
                else
                    props.navigation.navigate(navMap.consultationStep2)
            }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => {

                React.useEffect(() => {
                    if(!isMounted){
                        return
                    }
                    const unsubscribe = props.navigation.addListener('focus', () => {
                        if(!user)
                            props.navigation.navigate(navMap.signup)
                    });

                    return unsubscribe;
                }, [props.navigation]);

                React.useEffect(() => {
                    if(!isMounted){
                        return
                    }
                    if (consultReducer.redirectToStep2)
                        props.navigation.navigate(navMap.consultationStep2)
                }, [consultReducer.redirectToStep2])

                React.useEffect(() => {
                    if(!isMounted){
                        return
                    }
                    if (consultReducer.consultationObj && !petProfileImg && !currMsgImgUlrMap[values.petImageUrl]) {
                        dispatch(getImageDloadUrlReq(values.petImageUrl))
                    }
                })

                const pickImage = async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [4, 3],
                    });

                    console.log(result)

                    if (!result.cancelled) {
                        const petImageUrl = `${user.id}\pet${Math.round(Math.random() * 1000000)}`;
                        formik.setFieldValue('petImageUrl', petImageUrl, false)
                        setPetProfileImg({ uri: result.uri });
                        consultationImgUpload({ file: result, pathUrl: petImageUrl })
                    }
                };

                let petImgCloudUrl = null;
                if (consultReducer.consultationObj && !petProfileImg && currMsgImgUlrMap[values.petImageUrl]) {
                    petImgCloudUrl = { uri: currMsgImgUlrMap[values.petImageUrl] }
                }

                
                const ViewWithSpinner = withSpinner(View);

                return (

                    <ScrollView style={{ flex: 1 }}>
                            <>
                                <OverlapLoading isLoading={loading}/>
                            </>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <ModalList inputList={breedList} title={'Type Breed name'} onSelect={(item) => {
                                    hideModal()
                                    formik.setFieldValue('breed', item, true)
                                }} />
                            </Modal>
                        </Portal>

                        <View isLoading={loading}>
                            <View style={styles.petavatar}>
                                <Avatar.Image size={150} source={petProfileImg || petImgCloudUrl || dogProfile} />
                                <Pressable onPress={pickImage}>
                                    <FontAwesome name="edit" size={24} color="black" />
                                </Pressable>
                            </View>
                            <View style={styles.padding}>
                                <TextInput
                                    mode='outlined'
                                    label="Pet Name"
                                    onChangeText={handleChange('petName')}
                                    onBlur={handleBlur('petName')}
                                    value={values.petName}
                                    error={errors.petName && touched.petName}
                                    disabled={!isEdit}
                                />
                                {errors.petName && touched.petName ?
                                    (<Text style={{ color: 'red' }}>{errors.petName}</Text>) : null}
                            </View>
                            <View style={styles.sex}>
                                <Text>Male</Text>
                                <RadioButton
                                    name="sex"
                                    value="male"
                                    status={values.sex === 'male' ? 'checked' : 'unchecked'}
                                    onPress={() => { formik.setFieldValue('sex', 'male', true) }}
                                    error={errors.sex && touched.sex}
                                    disabled={!isEdit}
                                    
                                />
                                <Text>Female</Text>
                                <RadioButton
                                    value="female"
                                    name="sex"
                                    status={values.sex === 'female' ? 'checked' : 'unchecked'}
                                    onPress={() => { formik.setFieldValue('sex', 'female', true) }}
                                    error={errors.sex && touched.sex}
                                    disabled={!isEdit}
                                />
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                {errors.sex && touched.sex ?
                                    (<Text style={{ color: 'red' }}>{errors.sex}</Text>) : null}
                            </View>
                            <View style={styles.age}>
                                <TextInput
                                    style={{ width: 150 }}
                                    keyboardType={"number-pad"}
                                    mode='outlined'
                                    label="Years"
                                    onChangeText={handleChange('years')}
                                    onBlur={handleBlur('years')}
                                    value={values.years}
                                    error={errors.years && touched.years}
                                    disabled={!isEdit}
                                />
                                <TextInput
                                    style={{ width: 150 }}
                                    keyboardType={"number-pad"}
                                    mode='outlined'
                                    label="Months"
                                    onChangeText={handleChange('months')}
                                    onBlur={handleBlur('months')}
                                    value={values.months}
                                    error={errors.months && touched.months}
                                    disabled={!isEdit}
                                />
                            </View>
                            <View style={styles.padding}>
                                {errors.age && touched.age ?
                                    (<Text style={{ color: 'red' }}>{errors.age}</Text>) : null}
                            </View>
                            <View style={styles.padding}>
                                <TextInput
                                    keyboardType={"number-pad"}
                                    mode='outlined'
                                    label="Weight"
                                    onChangeText={handleChange('weight')}
                                    onBlur={handleBlur('weight')}
                                    value={values.weight}
                                    error={errors.weight && touched.weight}
                                    disabled={!isEdit}
                                />
                                {errors.weight && touched.weight ?
                                    (<Text style={{ color: 'red' }}>{errors.weight}</Text>) : null}
                            </View>
                            <View style={{ padding: 10, margin: 0 }}>
                                {/* <Text>Is Adopted</Text> */}
                                <Checkbox.Item label={'Is Adopted'} disabled={!isEdit}
                                    status={values.isAdopted ? 'checked' : ''}
                                    onPress={() => {
                                        if(isEdit)
                                            formik.setFieldValue('isAdopted', !values.isAdopted, true)
                                    }}
                                />
                            </View>
                            <View style={{ padding: 10, margin: 0 }}>
                                <Text>Breed</Text>
                                <Pressable onPress={isEdit? showModal: ()=>{}} disabled={!isEdit}>
                                    <View style={styles.breed}>
                                        <Text style={{ color: 'white' }}>{values.breed && values.breed.name ? values.breed.name : "Click here to add"}</Text>
                                    </View>
                                </Pressable>
                                {errors.breed && touched.breed ?
                                    (<Text style={{ color: 'red' }}>{errors.breed}</Text>) : null}
                            </View>
                            <View style={styles.padding}>
                                <Button onPress={handleSubmit} title={consultReducer.consultationObj ? "Next" : "Submit"} />
                            </View>
                        </View>
                    </ScrollView>

                )
            }
            }

        </Formik>


    );
};

// backgroundColor: '#FAF9F8',
// borderColor: '#bbb',

const styles = StyleSheet.create({
    padding: { padding: 5 },
    breed: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        color: 'white'
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
    }

})

export default ConsultFormStepOne;