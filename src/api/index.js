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

export default { post, get, getStorageUser };
