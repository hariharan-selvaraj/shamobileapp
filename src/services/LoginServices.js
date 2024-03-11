import axios from "axios";
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// let BaseURL = 'http://54.185.245.4:3000/'
let BaseURL = 'http://192.168.29.174:3000/'

// Login API
export async function LoginAPI(loginData) {
  console.log("loginData==> ", loginData);
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + `user/login`, loginData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    },
    ).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      reject(error.response.data);
    });
  });
}

// Worker Image Upload API
export async function WorkerImageUploadApi(inputJson) {
  console.log("Datas ===> ", JSON.stringify(inputJson))
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + `img/upload`, inputJson, {
      headers: { "Content-Type": "multipart/form-data" }
    }
    ).then(function (response) {
      console.log("check====>1,", response)
      resolve(response);
    }).catch(function (error) {
      console.log("Error image upload save ==> ", error.response)
      reject(error.response.data);
    });
  });
}

// Save Image Upload API
export async function AllSaveImageUploadAPI(inputData) {
  console.log("Datas ===> ", JSON.stringify(inputData))
  return new Promise(async (resolve, reject) => {
    await axios.post(BaseURL + `workTransaction/workOrder`, inputData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        // "access_token": user
      }
    }
    ).then(function (response) {
      console.log("check====>1,", response)
      resolve(response);
    }).catch(function (error) {
      console.log("Error image save ==> ", error.response)
      reject(error.response.data);
    });
  });
}

// Previous Work ID Get API
export async function PreviousWorkIDAPI() {
  return new Promise(async (resolve, reject) => {
    // await axios.get('https://town-council-1.onrender.com/workTransaction/workOrderTransaction', {
    await axios.get(BaseURL + `workTransaction/workOrderTransaction`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        // "access_token": user
      }
    }
    ).then(function (response) {
      console.log("check====>1,", response)
      resolve(response);
    }).catch(function (error) {
      reject(error.response.data);
    });
  });
}