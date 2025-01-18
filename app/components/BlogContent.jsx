'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Login from './Login';

export default function BlogContent() {
  const [token, setToken] = useState(null);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    content: '',
    title: '',
    category: 'personal',
    images: [],
    videoUrl: '',
  });
  const [currentComment, setCurrentComment] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // 获取所有博客
  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/posts')
        .then((response) => response.json())
        .then((data) => setEntries(data))
        .catch((error) => console.error('获取博客失败:', error));
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || currentEntry.content.trim() === '' || currentEntry.title.trim() === '') return;

    const newEntry = {
      ...currentEntry,
      date: new Date().toLocaleDateString('zh-CN'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });
      const data = await response.json();
      if (response.ok) {
        alert('博客发布成功');
        setEntries([data, ...entries]);
      } else {
        alert('博客发布失败');
      }
    } catch (err) {
      console.error('发布博客失败:', err);
      alert('发布博客失败');
    }

    setCurrentEntry({
      content: '',
      title: '',
      category: 'personal',
      images: [],
      videoUrl: '',
    });
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setEntries(entries.map((entry) => (entry.id === postId ? data : entry)));
      }
    } catch (err) {
      console.error('点赞失败:', err);
      alert('点赞失败');
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (currentComment.trim() === '') return;
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: currentComment }),
      });
      const data = await response.json();
      if (response.ok) {
        setEntries(entries.map((entry) => (entry.id === postId ? data : entry)));
        setCurrentComment('');
      }
    } catch (err) {
      console.error('评论失败:', err);
      alert('评论失败');
    }
  };

  if (!token) {
    return <Login onLogin={(token) => setToken(token)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={currentEntry.title}
          onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
          className="w-full p-3 text-lg border-0 border-b focus:ring-0 focus:border-gray-900 transition-colors"
          placeholder="标题"
        />
        <textarea
          value={currentEntry.content}
          onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
          className="w-full p-3 min-h-32 border rounded-lg focus:ring-0 focus:border-gray-900 transition-colors"
          placeholder="写点什么..."
        />
        <Button type="submit" className="w-32">
          发布
        </Button>
      </form>

      <div className="space-y-8">
        {entries.map((entry) => (
          <article key={entry.id} className="p-6 bg-white rounded-lg border border-gray-100">
            <header className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-medium mb-2">{entry.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {entry.date}
                  </span>
                  <span className="px-2 py-1 bg-gray-50 rounded">{entry.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleLike(entry.id)}>
                  👍 {entry.likes || 0}
                </Button>
              </div>
            </header>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
            {entry.images?.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {entry.images.map((url, idx) => (
                  <img key={idx} src={url} alt={`图片 ${idx + 1}`} className="max-w-full h-auto rounded" />
                ))}
              </div>
            )}
            {entry.videoUrl && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="400"
                  src={entry.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">评论:</h3>
              <ul>
                {entry.comments?.map((comment, index) => (
                  <li key={index} className="mt-2">
                    <p>{comment.text}</p>
                  </li>
                ))}
              </ul>
              <textarea
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                className="w-full p-2 mt-2 border rounded-lg"
                placeholder="写下你的评论..."
              />
              <Button
                type="button"
                onClick={() => handleCommentSubmit(entry.id)}
                className="mt-2"
              >
                提交评论
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
