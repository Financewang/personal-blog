import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建 AuthContext 上下文
const AuthContext = createContext(null);

// AuthProvider 组件，用于提供身份验证功能
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 用于处理加载状态

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('访问 localStorage 时出错:', error);
      } finally {
        setIsLoading(false); // 加载完成
      }
    }
  }, []);

  // 登录方法
  const login = (newToken) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken); // 将 token 存储到 localStorage
      }
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('登录时出错:', error);
    }
  };

  // 登出方法
  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token'); // 从 localStorage 删除 token
      }
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('登出时出错:', error);
    }
  };

  // 如果正在加载，返回加载指示器
  if (isLoading) {
    return <div>Loading...</div>; // 或者你可以自定义一个加载组件
  }

  // 提供上下文
  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，用于访问 AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内使用');
  }
  return context;
};

// 默认导出 AuthProvider
export default AuthProvider;
