import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import AboutScreen from './screens/About';

import Tab1MainScreen from './screens/Tab1Main/';

import Tab2FindScreen  from './screens/Tab2Find/';

import Tab3WriteScreen from './screens/Tab3Write/';
import SelectPaperScreen from './screens/Tab3Write/SelectPaper';
import WriteTextWebViewScreen from './screens/Tab3Write/WriteTextOnWebView';
import SelectReceiverScreen from './screens/Tab3Write/SelectReceiver';
import SelectEnvelopeScreen from './screens/Tab3Write/SelectEnvelope';
import SelectMediaScreen from './screens/Tab3Write/SelectMedia';

import Tab4MyInfoScreen from './screens/Tab4MyInfo/';


const AuthStackNavigation = createStackNavigator({
  signUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  signIn: { screen: SignInScreen, navigationOptions: { title: '로그인' } },
  about: { screen: AboutScreen, navigationOptions: { title: '트리글?' } }
}, {
  initialRouteName: 'signUp',
});

const MainScreenStackNavigation = createStackNavigator({
  entry: { screen: Tab1MainScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const FindScreenStackNavigation = createStackNavigator({
  entry: { screen: Tab2FindScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const WriteScreenStackNavigation = createStackNavigator({
  entry: { screen: Tab3WriteScreen, navigationOptions: { header: null } },
  selectPaper: { screen: SelectPaperScreen, navigationOptions: { title: '편지지 선택' } },
  write: { screen: WriteTextWebViewScreen, navigationOptions: { title: '본문 작성' } },
  selectReceiver: { screen: SelectReceiverScreen, navigationOptions: { title: '받는이 선택' } },
  selectEnvelope: { screen: SelectEnvelopeScreen, navigationOptions: { title: '편지봉투 선택' } },
  selectMedia: { screen: SelectMediaScreen, navigationOptions: { title: '사진, 영상 추가' } },
}, {
  initialRouteName: 'entry',
})

const MyInfoStackNavigation = createStackNavigator({
  entry: { screen: Tab4MyInfoScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const MainBottomNavigation = createBottomTabNavigator({
  main: MainScreenStackNavigation,
  find: FindScreenStackNavigation,
  write: WriteScreenStackNavigation,
  myInfo: MyInfoStackNavigation 
}, {
  initialRouteName: 'main',
})

export default createSwitchNavigator({
  auth: AuthStackNavigation,
  main: MainBottomNavigation
})
