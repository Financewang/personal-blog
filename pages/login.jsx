import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/contexts/AuthContext'; // 确保路径正确

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // 从上下文中获取登录方法
  const router = useRouter();

  // 表单验证
  const validateForm = () => {
    if (!username || !password) {
      setError('用户名和密码不能为空');
      return false;
    }
    return true;
  };

  // 表单提交处理函数
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // 设置加载状态
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('用户名或密码错误');
      }

      const data = await response.json();
      login(data.token); // 存储 token
      router.push('/dashboard'); // 跳转到仪表板页面
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // 重置加载状态
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>登录</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>用户名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading} style={{ padding: '0.5rem 1rem' }}>
          {isLoading ? 'Logging in...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default Login;
