import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建上下文
const AuthContext = createContext(null);

// 身份验证提供者组件
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // 添加加载状态

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
      }
      setToken(newToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // 提供加载状态检查
  if (isLoading) {
    return null; // 或者返回一个加载指示器
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        isAuthenticated, 
        login, 
        logout,
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 使用自定义 hook 来访问上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 默认导出 AuthProvider
export default AuthProvider;