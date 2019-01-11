import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default class SwiperComp extends Component {
  render(){
    return (
      <Swiper 
        style={styles.wrapper} 
        showsButtons={true}
        showsPagination={false}
        onIndexChanged={this.props.onIndexChanged}
        loop={false}
      >
        <Image style={styles.slide1} source={require('./../../static/avatars/users-1.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-2.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-3.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-4.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-5.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-6.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-7.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-8.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-9.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-10.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-11.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-12.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-13.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-14.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-15.png')}>
        </Image>
        <Image style={styles.slide1} source={require('./../../static/avatars/users-16.png')}>
        </Image>
      </Swiper>
    );
  }
}

