import axios from "axios";
import { FIND_FALCONE, PLANETS_API, TOKEN_API, VEHICLES_API } from "./Constants";

const getPlanets = () => {
  return axios.get(PLANETS_API).then(res => res.data).catch(err => console.log(err));
};

const getVehicles = () => {
  return axios.get(VEHICLES_API).then(res => res.data).catch(err => console.log(err));
};

const getToken = () => {
  return axios.post(TOKEN_API, {}, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.data.token).catch(err => console.log(err));
}

const findFalcone = (request) => {
  return axios.post(FIND_FALCONE, request, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.data).catch(err => console.log(err));
};

const ApiService = {
  getPlanets,
  getVehicles,
  getToken,
  findFalcone,
};

export default ApiService;
