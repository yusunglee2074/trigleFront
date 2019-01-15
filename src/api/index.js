import { 
  Platform
} from 'react-native';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

const apiUrl = Platform.OS === 'ios' ? "http://localhost:3000/graphql" : "http://10.0.2.2:3000/graphql";

const post = (query) => {
  return axios.post(apiUrl, {query}, {timeout: 1000});
}

const get = (query) => {
  return axios.get(apiUrl + "?query=" + query);
}

const getStorageUser = (AsyncStorage) => {
  return AsyncStorage.getItem('user').then(user => {
    return user = JSON.parse(user);
  })
}

const setStorageUser = async (AsyncStorage, updatedUser) => {
  if (updatedUser) {
    let query = `mutation { updateUser (`
    for (let key in updatedUser) {
      query += (`${key}: "${updatedUser[key]}",`)
    }
    query = query.slice(0, -1);
    query += `) {
      id
      email
      nickname
      accessToken
      keywords {
        id
      }
      profileImage {
        url
      }
    }}`
    try {
      let user = await post(query)
    } catch (e) {
      console.log(e)
      return -1
    }
    AsyncStorage.setItem('user', JSON.stringify(user))
    return AsyncStorage.getItem('user').then(user => {
      return user = JSON.parse(user);
    })
  } else {
  }
}

export default { post, get, getStorageUser, setStorageUser };
