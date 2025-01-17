'use client';
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Mail, MessageCircle, Send, Twitter, Trash2, Image, Video } from 'lucide-react';

const categories = [
  { id: 'personal', name: '个人记录' },
  { id: 'financial', name: '财务管理' },
  { id: 'startup', name: '创业' },
  { id: 'thoughts', name: '思考' },
];

export default function BlogContent() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    content: '',
    title: '',
    category: 'personal',
    images: [],
    videoUrl: '',
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState('all');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (files) => {
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        continue;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(
          'https://api.imgbb.com/1/upload?key=8c7235625529ffdc69f7130dac3647cc',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (data.success) {
          setCurrentEntry((prev) => ({
            ...prev,
            images: [...prev.images, data.data.url],
          }));
        }
      } catch (error) {
        console.error('上传图片失败:', error);
        alert('上传图片失败，请重试');
      }
    }
  };

  const handleVideoUrlAdd = () => {
    const url = prompt('请输入视频链接(支持 YouTube, Bilibili):');
    if (url) {
      setCurrentEntry((prev) => ({
        ...prev,
        videoUrl: url,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.content.trim() === '' || currentEntry.title.trim() === '') return;

    const newEntry = {
      id: Date.now(),
      ...currentEntry,
      date: new Date().toLocaleDateString('zh-CN'),
    };

    if (editIndex === -1) {
      setEntries([newEntry, ...entries]);
    } else {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newEntry;
      setEntries(updatedEntries);
      setEditIndex(-1);
    }
    setCurrentEntry({
      content: '',
      title: '',
      category: 'personal',
      images: [],
      videoUrl: '',
    });
  };

  const filteredEntries = activeFilter === 'all' ? entries : entries.filter((entry) => entry.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="border-b fixed w-full bg-white z-50 shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Finance Wang's Blog</h1>
          <div className="flex items-center space-x-4 overflow-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`text-sm sm:text-base px-3 py-1 rounded-lg ${
                  activeFilter === category.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-sm sm:text-base px-3 py-1 rounded-lg ${
                activeFilter === 'all' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              全部
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pt-24">
        <Card className="mb-12 border shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <input
                type="text"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="w-full px-3 py-2 sm:py-3 border rounded-lg"
                placeholder="标题"
              />
              <textarea
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                className="w-full px-3 py-2 sm:py-3 border rounded-lg min-h-[80px]"
                placeholder="写点什么..."
              />
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <select
                  value={currentEntry.category}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, category: e.target.value })}
                  className="border rounded-lg px-2 py-1 sm:px-3 sm:py-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <Button type="button" onClick={() => fileInputRef.current.click()}>
                  添加图片
                </Button>
                <Button type="button" onClick={handleVideoUrlAdd}>
                  添加视频
                </Button>
                <Button type="submit">{editIndex === -1 ? '发布' : '更新'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <article key={entry.id} className="p-4 border rounded-lg">
              <h2 className="text-lg font-bold">{entry.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{entry.date}</p>
              <p>{entry.content}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
