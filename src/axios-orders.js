import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger1-9f9f3.firebaseio.com/",
});

export default instance;
