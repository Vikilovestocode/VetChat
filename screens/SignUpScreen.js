import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../actions/authActions';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


const validateForm = (values)=>{
  let err = {};
  

  if(!values.name){
      err.name = 'Required'
  }

  if(values.email && !validateEmail(values.email)){
      err.email = 'Invalid email'
  }
  
  if(!values.phone){
      err.phone = 'Required'
  }

  return err;

}



export default function SignUpScreen(props){


  const dispatch = useDispatch();

  const { user } = useSelector(({ authReducer })=> (authReducer))

  useEffect(()=>{
    console.log(' SignUpScreen route.params :: -----', props.route.params)
    console.log(' SignUpScreen props :: -----', props)


    if(user && props.navigation && props.route.params){
      props.navigation.navigate(props.route.params.nextScreen)
    }

  },[])

    return (
        <Formik
            initialValues={{ name: '', phone: '', email: '', district: '', state: '', pincode: ''}}
            validate={validateForm}
            onSubmit={values => {
                console.log(values)
                dispatch(signUpRequest(values))
                }}>

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, ...formik }) => {
              
              
              return (
                <ScrollView style={{ flex: 1 }}>
                  <View style={{paddingTop: 40}}>
                  <View style={styles.padding}>

                    <TextInput
                      mode='outlined'
                      label="Name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      error={errors.name && touched.name}
                    />
                    {errors.name && touched.name ?
                      (<Text style={{ color: 'red' }}>{errors.name}</Text>) : null}
                  </View>

                  <View style={styles.padding}>

                    <TextInput
                      mode='outlined'
                      label="Phone No"
                      onChangeText={handleChange('phone')}
                      keyboardType={"number-pad"}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      maxLength={10}
                      error={errors.phone && touched.phone}
                    />
                    {errors.phone && touched.phone ?
                      (<Text style={{ color: 'red' }}>{errors.phone}</Text>) : null}
                  </View>

                  <View style={styles.padding}>

                    <TextInput
                      mode='outlined'
                      label="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      error={errors.email && touched.email}
                    />
                    {errors.email && touched.email ?
                      (<Text style={{ color: 'red' }}>{errors.email}</Text>) : null}
                  </View>
                  <View style={styles.padding}>

                  <TextInput
                    mode='outlined'
                    label="District"
                    onChangeText={handleChange('district')}
                    onBlur={handleBlur('district')}
                    value={values.district}
                    error={errors.district && touched.district}
                  />
                  {errors.district && touched.district ?
                    (<Text style={{ color: 'red' }}>{errors.district}</Text>) : null}
                  </View>
                  <View style={styles.padding}>

                    <TextInput
                        mode='outlined'
                        label="State"
                        onChangeText={handleChange('state')}
                        onBlur={handleBlur('state')}
                        value={values.state}
                        error={errors.state && touched.state}
                      />
                      {errors.state && touched.state ?
                        (<Text style={{ color: 'red' }}>{errors.state}</Text>) : null}
                    </View>
                    <View style={styles.padding}>

                      <TextInput
                        mode='outlined'
                        label="Pin Code"
                        onChangeText={handleChange('pincode')}
                        onBlur={handleBlur('pincode')}
                        value={values.pincode}
                        error={errors.pincode && touched.pincode}
                      />
                      {errors.pincode && touched.pincode ?
                        (<Text style={{ color: 'red' }}>{errors.pincode}</Text>) : null}
                    </View>
                    <View style={styles.padding}>
                     <Button onPress={handleSubmit} title="Submit" />
                    </View>
                  </View>
            </ScrollView>
            )
          }
            }

        </Formik>
    
    )

}

const styles = StyleSheet.create({
  padding:{ padding: 5},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})