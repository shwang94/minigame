import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const httpClient = axios.create({
  baseURL: BASE_API_URL || 'https://minigame-api.azurewebsites.net',
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin":"*"
  }
});

export const get = async (endPoint, options = {}) => {
  const response = await httpClient.get(endPoint, options);
  return response.data;
};

export const post = async (endPoint, params) => {
  const response = await httpClient.post(endPoint, params);
  return response.data;
};

export default httpClient;