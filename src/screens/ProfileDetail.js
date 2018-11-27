import React, { Component } from 'react';
import { 
  ScrollView, AsyncStorage, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, WebView
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';

const user = {
  nickname: '볶음밥#13',
  profileImage: '',
  birthday: '1991.04.12',
  address: {
    address1: '경기도 수원시',
    address2: '세지로 420 301호'
  },
  keyword: '#과학#프로그래밍#소설#영화#맛집#술#',
  gender: 'male',
  hide: '#address#birthDay',
  lastLogin: '1일 전' 
}

class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user
    };
  }

  static navigationOptions =  ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: 'red',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      }
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ title: this.state.user.nickname});
  }
  
  componentDidAppear() {
    this.setState({ text: 'power' });
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ backgroundColor: 'grey', height: 65 }}>
          </View>
          <View style={{ marginTop: 100, padding: 20 }}>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="cake" type="entypo" size={14}></Icon>
              <Text> 생일 {this.state.user.birthday}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="location-pin" type="entypo" size={14}></Icon>
              <Text> 지역 경기도 수원시</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="documents" type="entypo" size={14}></Icon>
              <Text> 답장률 70%</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Icon name="back-in-time" type="entypo" size={14}></Icon>
              <Text> 마지막 접속 {this.state.user.lastLogin}</Text>
            </View>
            <View style={styles.divider}/>
            <View>
              <Text>관심 키워드</Text>
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                <Button
                  title="#나는 배고프다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#나는 다이어트가 하고싶다"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
                <Button
                  title="#영화"
                  titleStyle={{ color: 'black', fontWeight: 'normal', fontSize: 13 }}
                  buttonStyle={{
                    height: 30,
                    backgroundColor: "transparent",
                    borderColor: "rgba(92, 99,216, 1)",
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderRadius: 5
                  }}
                  containerStyle={{ marginTop: 10, marginRight: 5 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{ position:'absolute', left: 15, top: 0 }}>
            <Avatar
              size="xlarge"
              containerStyle={{ borderWidth: 3, borderColor: 'white' }}
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { marginTop: 20, marginBottom: 20, borderBottomColor: '#cccccc', borderBottomWidth: 1 }
});

export default ProfileDetail;
