import React, { useEffect, useState } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 获取所有博客内容
    fetch('http://your-backend-url.com/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div>
      <h1>Welcome to My Personal Blog!</h1>
      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Likes: {post.likes}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
