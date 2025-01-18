import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // 如果未登录，跳转到首页
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // 未登录时不渲染内容
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back! Manage your blog here.</p>
    </div>
  );
};

export default Dashboard;
