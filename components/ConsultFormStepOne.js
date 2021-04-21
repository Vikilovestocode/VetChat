import * as React from 'react';
import { TextInput, RadioButton, Checkbox, Avatar ,  Modal, Portal} from 'react-native-paper';
import { Formik } from 'formik';
import { Text, View, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; 
import dogProfile from'../assets/dogProfile.png';
import  * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addPetRequest } from '../actions/consultAction';
import { breedList } from '../constants/breedList';
import SearchableDropdown from 'react-native-searchable-dropdown';

const validateForm = (values)=>{
    let err = {};
    

    if(!values.petName){
        err.petName = 'Required'
    }

    if(!values.years && !values.months){
        err.age = 'Required'
    }

    if(values.months && values.months>11){
        err.age = 'Invalid Month'
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
    const consultReducer = useSelector(({consultReducer})=>{
        return consultReducer
    })
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result)
    
        if (!result.cancelled) {
            setPetProfileImg({ uri :result.uri});
        }
      };

      const [visible, setVisible] = React.useState(false);

      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {backgroundColor: 'white', padding: 10};
      React.useEffect(()=>{
        if(consultReducer.redirectToStep2)  
             props.navigation.navigate('consultstep2')
      },[consultReducer.redirectToStep2])

    return (

        <Formik
            initialValues={{ petName: '', years: '', months: '', age: '', sex: '', weight: '', isAdopted: false,breed: 'js' }}
            validate={validateForm}
            onSubmit={values => {
                console.log(values)
                if(petProfileImg && petProfileImg.uri){
                    values.petProfileUri = petProfileImg.uri;
                }
                dispatch(addPetRequest(values))
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => (

                <ScrollView style={{flex: 1}}>

                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <SearchableDropdown
                                onTextChange={(text) => console.log('on text select', text)}
                                //On text change listner on the searchable input
                                onItemSelect={(item) => {
                                    hideModal()
                                    formik.setFieldValue('breed', item, true)
                                }}
                                //onItemSelect called after the selection from the dropdown
                                containerStyle={{ padding: 5 }}
                                //suggestion container style
                                textInputStyle={{
                                    //inserted text style
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    backgroundColor: '#FAF7F6',
                                }}
                                itemStyle={{
                                    //single dropdown item style
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#FAF9F8',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                }}
                                itemTextStyle={{
                                    //text style of a single dropdown item
                                    color: '#222',
                                }}
                                itemsContainerStyle={{
                                    //items container style you can pass maxHeight
                                    //to restrict the items dropdown hieght
                                    maxHeight: '50%',
                                }}
                                items={breedList}
                                //mapping of item array
                                //default selected item index
                                placeholder="Type Breed name"
                                //place holder for the search input
                                resetValue={false}
                                //reset textInput Value with true and false state
                                underlineColorAndroid="transparent"
                            //To remove the underline from the android input
                            />
                        </Modal>
                    </Portal>
   
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
                            onChangeText={handleChange('years')}
                            onBlur={handleBlur('years')}
                            value={values.years}
                            error={errors.years && touched.years}
                        />
                        <TextInput
                            style={{width: 150}}
                            keyboardType={"number-pad"}
                            mode= 'outlined'
                            label="Months"
                            onChangeText={handleChange('months')}
                            onBlur={handleBlur('months')}
                            value={values.months}
                            error={errors.months && touched.months}
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
                     <Pressable onPress={showModal}> 
                     <View style={styles.breed}>
                         <Text>{values.breed && values.breed.name?values.breed.name:"Click here to add"}</Text>
                     </View>
                    </Pressable>
                     {/* <Button onPress={showModal} title={values.breed && values.breed.name?values.breed.name:"Click here to add"} /> */}

                        {/* <Picker
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
                        </Picker> */}
           
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

// backgroundColor: '#FAF9F8',
// borderColor: '#bbb',

const styles = StyleSheet.create ({
    padding:{ padding: 5},
    breed:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        color: 'white'
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

export default ConsultFormStepOne;