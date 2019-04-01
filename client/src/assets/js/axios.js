import axios from 'axios';
import router from '../../router'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

axios.defaults.timeout = 30000;

let loadingIndex;
//开始loading
function startLoading(){
	loadingIndex = Loading.service();
};
//关闭loading
function endLoading(){
	loadingIndex.close();
};

//request 拦截器
axios.interceptors.request.use(
	config => {
		//开启loading
		startLoading();
		//参数格式转换
		config.data = JSON.stringify(config.data);
		config.headers = {
			'Content-Type': 'application/json'
		};
		//设置请求头
		if(localStorage.access_token){
			config.headers.Authorization = localStorage.access_token;
		};
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

//response 拦截器
axios.interceptors.response.use(
	response => {
		//关闭loading
		endLoading();
		//code不为1时提示
		if(response.data.code != 1){
			Message.error(response.data.errMsg);
		};
		return response;
	},
	error => {
		//关闭loading
		endLoading();
		//获取错误码
		const { status } = error.response;
		//捕获401
		if(status == 401){
			Message.error('token失效，请重新登录');
			localStorage.removeItem('access_token');
			router.push('/login');
		};
		//错误提醒
		Message.error(error.response.data);
		return Promise.reject(error)
	}
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}