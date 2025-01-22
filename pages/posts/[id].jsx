import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../../utils/axios';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/posts/${id}`);
      setPost(response);
      setError(null); // 清除之前的错误
    } catch (err) {
      console.error('获取文章失败:', err);
      setError('无法加载文章，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await apiClient.post(`/posts/${id}/like`);
      fetchPost(); // 点赞后重新加载文章数据
    } catch (err) {
      console.error('点赞失败:', err);
      setError('点赞失败，请稍后重试');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // 防止提交空评论
    try {
      await apiClient.post(`/posts/${id}/comments`, { text: comment });
      setComment(''); // 清空评论框
      fetchPost(); // 评论后重新加载文章数据
    } catch (err) {
      console.error('评论失败:', err);
      setError('发表评论失败，请稍后重试');
    }
  };

  // 加载中或页面生成中状态
  if (router.isFallback || loading) {
    return <div>加载中...</div>;
  }

  // 如果发生错误
  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  // 如果未找到文章数据
  if (!post) {
    return <div className="text-center text-gray-500 p-4">文章未找到</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-4">
        <span>分类: {post.category}</span>
        <span className="ml-4">点赞: {post.likes}</span>
      </div>
      <div className="prose max-w-none mb-8">{post.content}</div>
      <button
        onClick={handleLike}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        点赞
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">评论</h2>
        <form onSubmit={handleComment} className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="写下你的评论..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            发表评论
          </button>
        </form>
        <div className="space-y-4">
          {post.comments?.map((comment, index) => (
            <div key={index} className="border p-4 rounded">
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
