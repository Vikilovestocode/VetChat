import PropTypes from 'prop-types'
import React, { Component, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
} from 'react-native'
import CachedImage from 'react-native-expo-cached-image';
import Lightbox from 'react-native-lightbox'
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getImageDloadUrlReq } from '../actions/consultAction'


const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
})

  export default function ChatRenderImage(props) {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
    } = props
    const dispatch = useDispatch();
  
    const { currMsgImgUlrMap } = useSelector(({consultReducer})=>{
      return consultReducer
   })    
    
    useEffect(()=>{
      console.log(' chat render image pathurl', currentMessage.pathUrl);
      if(!currMsgImgUlrMap[currentMessage.pathUrl]){
        dispatch(getImageDloadUrlReq(currentMessage.pathUrl))
      }
    }, [])  



    if (!!currentMessage) {
      if(!currentMessage.file && currMsgImgUlrMap && !currMsgImgUlrMap[currentMessage.pathUrl]){
        return  <ActivityIndicator animating={true} color={Colors.red800} />
      }
      return (
        <View style={[styles.container, containerStyle]}>
          <Lightbox
            activeProps={{
              style: styles.imageActive,
            }}
            {...lightboxProps}
          >
            {/* <Image
              {...imageProps}
              style={[styles.image, imageStyle]}
              source={{ uri: currMsgImgUlrMap[currentMessage.pathUrl] }}
            /> */}
            <CachedImage
                {...imageProps}
                style={[styles.image, imageStyle]}
                source={currentMessage.file? currentMessage.file : 
                  { uri: currMsgImgUlrMap[currentMessage.pathUrl]}}
            />
          </Lightbox>
        </View>
      )
    }
    return null
  }
