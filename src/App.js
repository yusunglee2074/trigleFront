import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import AboutScreen from './screens/About';

import Tab1MainScreen from './screens/Tab1Main/';
import Tab2FindScreen  from './screens/Tab2Find/';
import Tab3WriteScreen from './screens/Tab3Write/';
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
