import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // 替换为你的后端 API 基础地址
    timeout: 5000, // 设置请求超时时间（可选）
});

// 添加请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token');
        if (token) {
            // 如果有 token，则将其添加到请求头中
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // 返回修改后的配置
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

// 添加响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        // 响应成功时直接返回数据
        return response.data;
    },
    (error) => {
        // 响应错误处理
        if (error.response) {
            console.error(`API 错误: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
            console.error('请求未收到响应:', error.request);
        } else {
            console.error('请求配置错误:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
