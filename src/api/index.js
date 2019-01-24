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

const setReceiver = (AsyncStorage, receiverArray) => {
  AsyncStorage.setItem('receivers', JSON.stringify(receiverArray))
  return AsyncStorage.getItem('receivers').then(receivers => {
    return JSON.parse(receivers);
  })
}

const getReceiver = (AsyncStorage) => {
  return AsyncStorage.getItem('receivers').then(receivers => {
    return JSON.parse(receivers);
  })
}

const get = (query) => {
  return axios.get(apiUrl + "?query=" + query);
}

const getStorageUser = (AsyncStorage) => {
  return AsyncStorage.getItem('user').then(user => {
    return JSON.parse(user);
  })
}

const setStorageUser = async (AsyncStorage, updatedUser) => {
  AsyncStorage.setItem('user', JSON.stringify(updatedUser))
  return AsyncStorage.getItem('user').then(user => {
    return JSON.parse(user);
  })
}

const updateUser = async (user) => {
  let query = `mutation { updateUser (`
  for (let key in user) {
    query += (`${key}: "${user[key]}",`)
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
    return await post(query);
  } catch (e) {
    console.log(e)
    return -1
  }
}

const getUser = (userId, moreInfo = []) => {
  let query = `{
      user(id: "${userId}") {
        id
        nickname
        email
        `
  for (let i = 0; i < moreInfo.length; i++) {
    query += (moreInfo[i] + ` \n `)
  }
  query += `}}`
  return get(query);
}
const color = {
  p: "#d7ccc8",
  pl: "#fffffb",
  pd: "#a69b97",
  s: "#5c6bc0",
  sl: "#8e99f3",
  sd: "#26418f",
  pt: "#000000",
  st: "#ffffff",
}

export default { color, setReceiver, getReceiver, getUser, updateUser, post, get, getStorageUser, setStorageUser };
