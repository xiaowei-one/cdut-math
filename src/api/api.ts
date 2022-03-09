import service from "../../config/request";
import axios from "axios";

// 获取近期比赛
export const queryAllCompetes = () => service.get("/showAllQN");

// 用户学号登陆验证
export const queryVerification = (data: any) =>
  service.post("/verification", data);

// 参赛者提交报名表
export const postCompeteInfo = (data: any) =>
  service.post("/intoContent", data);

export const getFileList = () => service.post("/files/showFile");

export const downloadFileById = (id: string) =>
  service.get(`/files/download?id=${id}`);

export const showForm = (id: string) => service.get(`/showField?id_fk=${id}`);

export const submitForm = (data: any) => service.post("/intoContent", data);

export const adminLogin = (data: any) => service.post("/login", data);

export const judgeLogin = (data: any) => service({
  url: '/judgeLogin',
  method: 'post',
  data,
  // withCredentials: true,
});
export const cancellation = (data: any) => service.get(`/cancellation?token=${data}`,);
