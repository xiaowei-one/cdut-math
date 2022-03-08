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
    if (response.config.responseType == "blob") {
        if (response.status === 200) {
            return response;
        } else {
            return Promise.reject("error");
        }
    } else if (
        response.headers["content-type"] === "application/octet-stream"
    ) {
        const res = response.data;
        downloadFile(res);
    } else {
        const res = response.data;
        if (res.code === "0") {
            return response.data;
        } else  {
            ElMessage.info(res.msg);
            return Promise.reject(response.data);
        }
    }
});

export default service;
