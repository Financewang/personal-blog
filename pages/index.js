import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '@/utils/axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await apiClient.get('/posts');
      setPosts(data);
    } catch (error) {
      console.error('获取文章失败:', error);
    }
  };

  const filteredPosts = selectedCategory === '全部' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 分类导航 */}
      <div className="mb-8">
        <div className="flex space-x-4 text-lg">
          {['全部', '个人记录', '财务管理', '创业', '思考'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <article 
            key={post._id} 
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/post/${post._id}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-500">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.summary}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <div>
                <span className="mr-4">分类: {post.category}</span>
                <span className="mr-4">👍 {post.likes}</span>
                <span>💬 {post.comments?.length || 0}</span>
              </div>
              <div className="text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 没有文章时显示 */}
      {filteredPosts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          {selectedCategory === '全部' 
            ? '还没有发布任何文章' 
            : `${selectedCategory}分类下还没有文章`}
        </div>
      )}

      {/* 写文章浮动按钮 */}
      {localStorage.getItem('token') && (
        <Link href="/admin/new-post">
          <button className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
            ✍️ 写文章
          </button>
        </Link>
      )}
    </div>
  );
}