import axios from 'axios';
import { getAuthorizationToken } from './authService';


async function getInstance() {
  const jwtToken = await getAuthorizationToken();
  return axios.create({
    timeout: 10000,
    headers: { Authorization: jwtToken },
  });
}


export default getInstance;
