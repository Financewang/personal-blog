import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'https://blog-backend-blond-delta.vercel.app/api', // 更新为 Vercel 部署的地址
    timeout: 5000, // 设置请求超时时间（可选）
    headers: {
        'Content-Type': 'application/json'
    }
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
            console.error(`API 错误: ${error.response.status} - ${error.response.data?.message}`);
            
            // 处理 401 未授权错误
            if (error.response.status === 401) {
                localStorage.removeItem('token'); // 清除无效的 token
                // 如果需要，可以在这里添加重定向到登录页的逻辑
            }
        } else if (error.request) {
            console.error('请求未收到响应:', error.request);
        } else {
            console.error('请求配置错误:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;