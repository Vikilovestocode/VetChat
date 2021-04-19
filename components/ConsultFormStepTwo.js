import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; 
import dogProfile from'../assets/dogProfile.png';
import  * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { addPetRequest } from '../actions/consultAction';
import { breedList } from '../constants/breedList';
import SearchableDropdown from 'react-native-searchable-dropdown';

const validateForm = (values)=>{
    let err = {};
    

    if(!values.petName){
        err.petName = 'Required'
    }

    if(!values.age){
        err.age = 'Required'
    }
    
    if(!values.sex){
        err.sex = 'Required'
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



const ConsultFormStepOne = (props) => {
    const [petProfileImg, setPetProfileImg] = React.useState(null);
    const dispatch = useDispatch();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        alert(result.uri);
        console.log(result)
    
        if (!result.cancelled) {
            setPetProfileImg({ uri :result.uri});
        }
      };

    return (

        <Formik
            initialValues={{ petName: '', years: '', months: '', age: '', sex: '', weight: '', isAdopted: false,breed: 'js' }}
            validate={validateForm}
            onSubmit={values => {
                console.log(values)
                dispatch(addPetRequest())
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => (

                <ScrollView style={{flex: 1}}>
                <View >
                    <View style={styles.petavatar}>
                       <Avatar.Image size={150} source={petProfileImg? petProfileImg: dogProfile} />
                       <Pressable onPress={pickImage}> 
                       <FontAwesome name="edit" size={24} color="black" />
                       </Pressable>
                    </View>
                    <View style={styles.padding}>

                        <TextInput
                            mode= 'outlined'
                            label="Pet Name"
                            onChangeText={handleChange('petName')}
                            onBlur={handleBlur('petName')}
                            value={values.petName}
                            error={errors.petName && touched.petName}
                        />
                        { errors.petName && touched.petName?
                             (<Text style={{ color: 'red'}}>{errors.petName}</Text>): null}
                    </View>
                    <View style={styles.sex}>
                        <Text>Male</Text>
                        <RadioButton
                            name="sex"
                            value="male"
                            status={values.sex === 'male' ? 'checked' : 'unchecked'}
                            onPress={() => { formik.setFieldValue('sex', 'male', true)}}
                            error={errors.sex && touched.sex}
                        />  
                        <Text>Female</Text>
                        <RadioButton
                            value="female"
                            name="sex"
                            status={values.sex === 'female' ? 'checked' : 'unchecked'}
                            onPress={() => { formik.setFieldValue('sex', 'female', true)}}
                            error={errors.sex && touched.sex}
                        />  
                    </View>
                    <View style={{paddingLeft: 10}}>
                    { errors.sex && touched.sex?
                             (<Text style={{ color: 'red'}}>{errors.sex}</Text>): null}
                    </View>
                    <View style={styles.age}>
                        <TextInput
                        style={{width: 150}}
                         keyboardType={"number-pad"}
                            mode= 'outlined'
                            label="Years"
                            onChangeText={handleChange('age')}
                            onBlur={handleBlur('age')}
                            value={values.age}
                            error={errors.age && touched.age}
                        />
                        <TextInput
                            style={{width: 150}}
                            keyboardType={"number-pad"}
                            mode= 'outlined'
                            label="Months"
                            onChangeText={handleChange('age')}
                            onBlur={handleBlur('age')}
                            value={values.age}
                            error={errors.age && touched.age}
                        />
                    </View>
                    <View style={styles.padding}>
                    { errors.age && touched.age?
                            (<Text style={{ color: 'red'}}>{errors.age}</Text>): null}
                    </View>
                    <View style={styles.padding}>
                        <TextInput 
                            keyboardType={"number-pad"}
                            mode= 'outlined'
                            label="Weight"
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight}
                            error={errors.weight && touched.weight}
                        />
                        { errors.weight && touched.weight?
                        (<Text style={{ color: 'red'}}>{errors.weight}</Text>): null}
                    </View>
                    <View style={{padding: 10, margin: 0 }}>
                     <Text>Is Adopted</Text>
                        <Checkbox
                            status={values.isAdopted ? 'checked' : 'unchecked'}
                            onPress={() => {
                                formik.setFieldValue('isAdopted', !values.isAdopted, true)
                            }}
                        />
                    </View>
                    <View style={{padding: 10, margin: 0 }}>
                     <Text>Breed</Text>
                        <Picker
                            style={{ minHeight: 50}}
                            selectedValue={values.breed}
                            onValueChange={(itemValue, itemIndex) =>
                                formik.setFieldValue('breed', itemValue, true)
                            }>
                            <Picker.Item label="Adopted" value="Adopted Indian Breed" />
                            <Picker.Item label="Indian spitz" value="Indian spitz" />
                            <Picker.Item label="mix" value="mix" />
                            <Picker.Item label="mix" value="mix" />
                            <Picker.Item label="mix" value="mix" />
                            <Picker.Item label="mix" value="mix" />
                            <Picker.Item label="mix" value="mix" />
                            <Picker.Item label="mix" value="mix" />
                        </Picker>
                        { errors.breed && touched.breed?
                        (<Text style={{ color: 'red'}}>{errors.breed}</Text>): null}
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

export default ConsultFormStepOne;