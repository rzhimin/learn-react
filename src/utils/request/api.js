import axios from "axios";

// 定义 HTTP 默认异常类型
const HTTP_DEFAULT_ERRORS = {
  401: "登录状态失效,请重新登录",
  403: "拒绝访问",
  404: "请求地址不存在",
  500: "服务器内部错误",
  502: "网关错误",
  504: "网关超时"
};

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 接口基础地址
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // 获取本地存储中的 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 将 token 添加到请求头
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, errorCode, msg, data } = response.data;
    if (code > 0) {
      // 请求成功
      return data;
    } else {
      // 请求异常
      const error = new Error(msg || "请求异常");
      error.code = errorCode;
      return Promise.reject(error);
    }
  },
  error => {
    let message = "";
    const { response } = error;
    if (response) {
      // 处理 HTTP 默认异常
      const errorText = HTTP_DEFAULT_ERRORS[response.status];
      message = errorText || "请求异常";
      if (response.status === 401) {
        // 登录状态失效,清除本地存储中的 token
        localStorage.removeItem("token");
      }
    } else {
      // 处理网络异常
      message = "网络异常,请检查网络连接";
    }
    return Promise.reject(new Error(message));
  }
);

// 自定义异常处理函数
const errorHandlers = {};

/**
 * 注册自定义异常处理逻辑
 * @param {Number} code 异常代码
 * @param {Function} handler 异常处理函数
 */
function registerErrorHandler(code, handler) {
  errorHandlers[code] = handler;
}

/**
 * 获取 GET 请求参数
 * @param {Object} params 请求参数对象
 * @returns {string} 请求参数字符串
 */
function getQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");
}

/**
 * 发送 GET 请求
 * @param {string} url 请求地址
 * @param {Object} params 请求参数
 * @param {Object} headers 请求头
 * @param {Function} errorHandler 自定义异常处理函数
 * @returns {Promise}
 */
async function get(url, params = {}, headers = {}, errorHandler) {
  const queryString = getQueryString(params);
  url = queryString ? `${url}?${queryString}` : url;
  try {
    return await service.get(url, { headers });
  } catch (error) {
    return await handleError(error, errorHandler);
  }
}

/**
 * 发送 POST 请求
 * @param {string} url 请求地址
 * @param {Object} data 请求数据
 * @param {Object} headers 请求头
 * @param {Function} errorHandler 自定义异常处理函数
 * @returns {Promise}
 */
async function post(url, data = {}, headers = {}, errorHandler) {
  try {
    return await service.post(url, data, { headers });
  } catch (error) {
    return await handleError(error, errorHandler);
  }
}

/**
 * 处理异常
 * @param {Error} error 异常对象
 * @param {Function} errorHandler 自定义异常处理函数
 * @returns {Promise}
 */
function handleError(error, errorHandler) {
  const { code } = error;
  if (errorHandlers[code]) {
    // 执行自定义异常处理逻辑
    return errorHandlers[code](error);
  } else {
    // 执行默认异常处理逻辑
    return Promise.reject(error);
  }
}

export { get, post, registerErrorHandler };
