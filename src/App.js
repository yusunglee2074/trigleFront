import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import AuthScreen from './screens/Auth';
import Tab1MainScreen from './screens/Tab1MainPage';

const AuthStackNavigation = createStackNavigator({
  signIn: { screen: AuthScreen, navigationOptions: { header: null } },
  signUp: { screen: Tab1MainScreen, navigationOptions: { title: '야호' } }
}, {
  initialRouteName: 'signIn',
});

const MainScreenStackNavigation = createStackNavigator({
  entry: { screen: AuthScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const FindScreenStackNavigation = createStackNavigator({
  entry: { screen: AuthScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const WriteScreenStackNavigation = createStackNavigator({
  entry: { screen: AuthScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const MyInfoStackNavigation = createStackNavigator({
  entry: { screen: AuthScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'entry',
})

const MainBottomNavigation = createBottomTabNavigator({
  main: { screen: AuthScreen, navigationOptions: { header: null } },
  find: { screen: AuthScreen, navigationOptions: { header: null } },
  write: { screen: AuthScreen, navigationOptions: { header: null } },
  myInfo: { screen: AuthScreen, navigationOptions: { header: null } },
}, {
  initialRouteName: 'main',
})

export default createSwitchNavigator({
  auth: AuthStackNavigation,
  main: MainBottomNavigation
})
