import axios from 'axios';


const service = {
  get: (url, options) => axios.get(url, options).catch((error) => {
    console.log(error);
  }),
  post: (url, options, optionalObj) => axios.post(url, options, optionalObj).catch((error) => {
    console.log(error);
  }),
  put: (url, data, optionalObj) => axios.put(url, data, optionalObj).catch((error) => {
    console.log(error);
  }),
  delete: (url, options) => axios.delete(url, options).catch((error) => {
    console.log(error);
  }),
};

export default service;