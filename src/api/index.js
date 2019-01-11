import { 
  Platform
} from 'react-native';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

const apiUrl = Platform.OS === 'ios' ? "http://localhost:3000/graphql" : "http://10.0.2.2:3000/graphql";

let post = (query) => {
  return axios.post(apiUrl, {query}, {timeout: 1000});
}

let get = (query) => {
  return axios.get(apiUrl + "?query=" + query);
}

export default { post, get };
