import axios from 'axios';
import { getIdJwtToken } from './authService';


function getInstance() {
  const jwtToken = getIdJwtToken();
  return axios.create({
    timeout: 1000,
    headers: { Authorization: jwtToken },
  });
}


export default getInstance;
