
import React from "react";

import { ScrollView, StyleSheet, View} from "react-native";
import {ActivityIndicator, Colors } from "react-native-paper";


const withSpinner = (Comp) => ({ isLoading, children, ...props }) => {

  if (isLoading) {
        console.log("withSpinner::::", isLoading)
      return <View style={styles.container}>  
             <ActivityIndicator animating={true} size={'large'} color={Colors.indigoA700} />
      </View>

  } else {

    return <Comp {...props}>{children}</Comp>;

  }

};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerTextStyle: {
      color: '#FFF',
    },
  });

export default withSpinner;