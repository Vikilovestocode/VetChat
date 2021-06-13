import * as React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import {ActivityIndicator, Colors } from "react-native-paper";


export default function OverlapLoading({ isLoading }){
    if(!isLoading)
        return null;

    return (
        <Portal>
          <Dialog visible={isLoading} dismissable={false}>
            <Dialog.Content>
              <ActivityIndicator animating={true} size={'large'} color={Colors.indigoA700} />
            </Dialog.Content>
          </Dialog>
        </Portal>
      );
}