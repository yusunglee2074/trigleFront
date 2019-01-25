import React from 'react';
import { View, Text } from 'react-native';
import { TabBarBottom, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'

import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import AboutScreen from './screens/About';

import ProfileDetailScreen from './screens/ProfileDetail';
import MailDetailScreen from './screens/MailDetail';

import Tab1MainScreen from './screens/Tab1Main/';
import Tab1WriteScreen from './screens/Tab1Main/Write';

import Tab2FindScreen  from './screens/Tab2Find/';
import SetKeywordScreen from './screens/Tab2Find/setKeyword';

import Tab3WriteScreen from './screens/Tab3Write/';
import SelectPaperScreen from './screens/Tab3Write/SelectPaper';
import WriteTextWebViewScreen from './screens/Tab3Write/WriteTextOnWebView';
import SelectEnvelopeScreen from './screens/Tab3Write/SelectEnvelope';
import SelectMediaScreen from './screens/Tab3Write/SelectMedia';

import Tab4MyInfoScreen from './screens/Tab4MyInfo/';
import ProfileScreen from './screens/Tab4MyInfo/Profile';
import StatisticsScreen from './screens/Tab4MyInfo/Statistics';
import AddressScreen from './screens/Tab4MyInfo/Address';
import SendMailScreen from './screens/Tab4MyInfo/SendMail';
import ReceiveMailScreen from './screens/Tab4MyInfo/ReceiveMail';
import ContactScreen from './screens/Tab4MyInfo/Contact';
import AboutTrigleScreen from './screens/Tab4MyInfo/AboutTrigle';
import NewAddressScreen from './screens/Tab4MyInfo/NewAddress';
import UpdateProfileScreen from './screens/Tab4MyInfo/UpdateProfile';

import api from './api';


const AuthStackNavigation = createStackNavigator({
  signUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  signIn: { screen: SignInScreen, navigationOptions: { title: '로그인' } },
  about: { screen: AboutScreen, navigationOptions: { title: '트리글?' } }
}, {
  initialRouteName: 'signUp',
});

const MainScreenStackNavigation = createStackNavigator({
  entry: { screen: Tab1MainScreen, navigationOptions: { title: '트리글' } },
  writeOnlineMail: { screen: Tab1WriteScreen, navigationOptions: { title: '메인화면 글쓰기' } },
  profileDetail: { screen: ProfileDetailScreen, navigationOptions: { title: '프로필' } },
  mailDetail: { screen: MailDetailScreen, navigationOptions: { title: '편지 내용' } },
}, {
  initialRouteName: 'entry',
})

const FindScreenStackNavigation = createStackNavigator({
  entry: { screen: Tab2FindScreen, navigationOptions: { title: '친구 찾기' } },
  setKeyword: { screen: SetKeywordScreen, navigationOptions: { title: '프로필 완성' } },
  profileDetail: { screen: ProfileDetailScreen, navigationOptions: { title: '프로필' } },
  mailDetail: { screen: MailDetailScreen, navigationOptions: { title: '편지 내용' } },
}, {
  initialRouteName: 'entry',
})

const WriteScreenStackNavigation = createStackNavigator({
  write: { screen: Tab3WriteScreen, navigationOptions: { title: '편지 쓰기' } },
  selectPaper: { screen: SelectPaperScreen, navigationOptions: { title: '편지지 선택' } },
  // write: { screen: WriteTextWebViewScreen, navigationOptions: { title: '본문 작성' } },
  selectReceiver: { screen: AddressScreen , navigationOptions: { title: '받는이 선택' } },
  selectEnvelope: { screen: SelectEnvelopeScreen, navigationOptions: { title: '편지봉투 선택' } },
  selectMedia: { screen: SelectMediaScreen, navigationOptions: { title: '사진, 영상 추가' } },
  profileDetail: { screen: ProfileDetailScreen, navigationOptions: { title: '프로필' } },
  mailDetail: { screen: MailDetailScreen, navigationOptions: { title: '편지 내용' } },
  newAddress: { screen: NewAddressScreen, navigationOptions: { title: '주소 추가' } },
}, {
  initialRouteName: 'write',
})

const MyInfoStackNavigation = createStackNavigator({
  entry: { screen: Tab4MyInfoScreen, navigationOptions: { title: '설정 메뉴' } },
  profile: { screen: ProfileDetailScreen , navigationOptions: { title: '내 프로필' } },
  statistics: { screen: StatisticsScreen, navigationOptions: { title: '공지사항' } },
  address: { screen: AddressScreen, navigationOptions: { title: '주소록' } },
  sendMail: { screen: SendMailScreen, navigationOptions: { title: '보낸 편지' } },
  receiveMail: { screen: ReceiveMailScreen, navigationOptions: { title: '받은 편지' } },
  contact: { screen: ContactScreen, navigationOptions: { title: '자주 묻는 질문' } },
  aboutTrigle: { screen: AboutTrigleScreen, navigationOptions: { title: '트리글' } },
  profileDetail: { screen: ProfileDetailScreen, navigationOptions: { title: '프로필' } },
  mailDetail: { screen: MailDetailScreen, navigationOptions: { title: '편지 내용' } },
  newAddress: { screen: NewAddressScreen, navigationOptions: { title: '주소 추가' } },
  updateProfile: { screen: UpdateProfileScreen, navigationOptions: { title: '프로필 수정' } },
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
  tabBarOptions: {
    activeBackgroundColor: api.color.pl,
    inactiveBackgroundColor: api.color.pl,
    activeTintColor: 'black',
    inactiveTintColor: api.color.primaryDarkColor,
    showLabel: false
  },
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'main') {
        iconName = `heart`;
      } else if (routeName === 'find') {
        iconName = `user-follow`;
      } else if (routeName === 'write') {
        iconName = `pencil`;
      } else if (routeName === 'myInfo') {
        iconName = `menu`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Icon name={iconName} type='simple-line-icon' size={horizontal ? 25 : 30} color={tintColor} />;
    }
  })
})

export default createSwitchNavigator({
  auth: AuthStackNavigation,
  main: MainBottomNavigation
})
