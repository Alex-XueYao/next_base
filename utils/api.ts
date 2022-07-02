import axios, { AxiosRequestConfig } from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const config: AxiosRequestConfig = isDev
	? {
			proxy: {
				host: '127.0.0.1',
				port: 9999,
			},
	  }
	: {}

const api = axios.create(config)

export default api
