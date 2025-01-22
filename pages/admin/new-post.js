import { useState } from 'react';
import apiClient from '../../utils/axios';
import { useRouter } from 'next/router';

export default function NewPost() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '个人记录',
    summary: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/posts', post);
      router.push('/');
    } catch (error) {
      console.error('发布文章失败:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">写文章</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="标题"
            className="w-full p-2 border rounded"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
          />
        </div>
        <div>
          <textarea
            placeholder="内容"
            className="w-full p-2 border rounded h-64"
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
          />
        </div>
        <div>
          <select
            className="w-full p-2 border rounded"
            value={post.category}
            onChange={(e) => setPost({...post, category: e.target.value})}
          >
            <option>个人记录</option>
            <option>财务管理</option>
            <option>创业</option>
            <option>思考</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="摘要"
            className="w-full p-2 border rounded h-20"
            value={post.summary}
            onChange={(e) => setPost({...post, summary: e.target.value})}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          发布
        </button>
      </form>
    </div>
  );
}