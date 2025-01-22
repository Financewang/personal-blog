import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext'; // 确保路径正确

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth(); // 从 AuthContext 获取 token
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('标题和内容不能为空');
      return;
    }

    setIsLoading(true); // 设置加载状态
    setError(''); // 清空错误信息

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 验证用户身份
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '创建博客失败');
      }

      // 成功后跳转到仪表板或首页
      router.push('/dashboard');
    } catch (err) {
      console.error('创建博客时发生错误:', err);
      setError(err.message || '创建博客时出错，请稍后重试');
    } finally {
      setIsLoading(false); // 重置加载状态
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>创建新博客</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ fontWeight: 'bold', display: 'block' }}>标题</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="content" style={{ fontWeight: 'bold', display: 'block' }}>内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{
              width: '100%',
              height: '200px',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          ></textarea>
        </div>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? '创建中...' : '创建博客'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
