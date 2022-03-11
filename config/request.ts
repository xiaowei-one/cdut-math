import axios from "axios";
import { downloadFile } from "./downloadFile";
import { ElMessage } from "element-plus";
import { baseURL } from "./config";

const service = axios.create({
  baseURL,
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    config.headers = { "Content-Type": "application/json;charset=UTF-8" };
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  const res = response.data;
  if (response.config.responseType == "blob") {
    if (response.status === 200) {
      return response;
    } else {
      return Promise.reject("error");
    }
  } else if (
    response.headers["content-type"] === "application/octet-stream"
  ) {
    downloadFile(res);
  } else if (res.code === '-2') {
    ElMessage.info(res.msg);
    return response;
  } else {
    if (res.code === "0") {
      return res;
    } else {
      ElMessage.error(res.msg);
      return Promise.reject(res);
    }
  }
});

export default service;
