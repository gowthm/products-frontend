import axios from "axios";

const API_URL = "http://localhost:3002"; // Change this to your API URL
const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use(
  function (config) {
    var user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const token = user?.access_token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);


export { instance };
