import axios from 'axios';
import { getIdJwtToken } from './authService';


async function getInstance() {
  const jwtToken = await getIdJwtToken();
  return axios.create({
    timeout: 1000,
    headers: { Authorization: jwtToken },
  });
}


export default getInstance;
