import axios from 'axios';

const api = axios.create({
  baseURL: '//34.64.197.212:8080/'

})

// api.interceptors.response.use(function (response) {
//   return response;
// }, function (error){
//   //에러 트레킹을 위한 함수 호출
//   sendErrorReport(error);
//   return Promise.reject(error);
// })

export default api;
