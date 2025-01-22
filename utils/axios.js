import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: 'https://blog-backend-blond-delta.vercel.app/api', // 确保指向正确的后端 API 地址
    timeout: 5000, // 设置请求超时时间（单位：毫秒）
    headers: {
        'Content-Type': 'application/json' // 设置默认的请求头
    }
});

// 添加请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token');
        if (token) {
            // 如果有 token，将其添加到请求头中
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // 返回修改后的配置
    },
    (error) => {
        // 请求错误处理
        console.error('请求拦截器发生错误:', error);
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
            console.error(
                `API 错误: ${error.response.status} - ${error.response.data?.message || '未知错误'}`
            );
            
            // 针对 401 未授权错误的处理
            if (error.response.status === 401) {
                localStorage.removeItem('token'); // 清除无效的 token
                // 如果需要，可以在此处添加跳转到登录页的逻辑，例如：
                // window.location.href = '/login';
            }
        } else if (error.request) {
            // 请求未收到响应时的处理
            console.error('未收到响应，请检查网络或后端服务:', error.request);
        } else {
            // 请求配置或其他错误
            console.error('请求配置错误:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
