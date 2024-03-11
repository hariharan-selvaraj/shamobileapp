import axios from 'axios';
import Config from 'react-native-config';
import { checkNetworkConnection } from '../components/componentfiles/networkService';

const api = axios.create({
  // baseURL: Config.API_URL, // Replace with your API base URL
  baseURL: 'https://api.shatechnosolutions.com/'
  // baseURL : 'http://192.168.29.174:3000/'
});

export const getMethod = async (endpoint, params = {}) => {
  try {
    const isConnected = await checkNetworkConnection();
    if (isConnected) {
      const response = await api.get(endpoint, { params });
      return response;
    } else {
      throw new Error('No internet connection');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const postMethod = async (endpoint, data = {}, headers = {}) => {
  const isConnected = await checkNetworkConnection();
  // console.log("isConnected-->", isConnected)
  if (isConnected) {
    try {
      const response = await api.post(endpoint, data, { headers });
      return response;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error('No internet connection');
  }
};