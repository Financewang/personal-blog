'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Mail, MessageCircle, Send, Twitter, Trash2, Image, Video } from 'lucide-react'

const categories = [
  { id: 'personal', name: '个人记录' },
  { id: 'financial', name: '财务管理' },
  { id: 'startup', name: '创业' },
  { id: 'thoughts', name: '思考' }
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
      if (file.size > 5 * 1024 * 1024) { // 5MB限制
        alert('图片大小不能超过5MB');
        continue;
      }
      
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        // 这里使用免费图床API
        const response = await fetch('https://api.imgbb.com/1/upload?key=8c7235625529ffdc69f7130dac3647cc', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        if (data.success) {
          setCurrentEntry(prev => ({
            ...prev,
            images: [...prev.images, data.data.url]
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
      setCurrentEntry(prev => ({
        ...prev,
        videoUrl: url
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.content.trim() === '' || currentEntry.title.trim() === '') return;

    const newEntry = {
      id: Date.now(),
      ...currentEntry,
      date: new Date().toLocaleDateString('zh-CN')
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

  const filteredEntries = activeFilter === 'all' 
    ? entries 
    : entries.filter(entry => entry.category === activeFilter);

  const renderVideoEmbed = (url) => {
    if (!url) return null;
    
    let embedUrl;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('bilibili.com')) {
      // 处理B站视频链接
      const bvid = url.split('/').pop();
      embedUrl = `https://player.bilibili.com/player.html?bvid=${bvid}`;
    }

    return embedUrl ? (
      <iframe 
        width="100%" 
        height="400" 
        src={embedUrl} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    ) : null;
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b fixed w-full bg-white z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-medium">Finance Wang's Blog</h1>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`text-gray-600 hover:text-gray-900 transition-colors ${
                  activeFilter === category.id ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                activeFilter === 'all' ? 'text-gray-900 font-semibold' : ''
              }`}
            >
              全部
            </button>
          </div>
          <div className="flex gap-6">
            <a href="mailto:chuanxiao579@gmail.com" className="text-gray-600 hover:text-gray-900" title="Email">
              <Mail size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900" title="WeChat: qianmiaomiao8">
              <MessageCircle size={20} />
            </a>
            <a href="https://wa.me/66631730281" className="text-gray-600 hover:text-gray-900" title="WhatsApp">
              <Send size={20} />
            </a>
            <a href="https://t.me/+4el_FdL3r0ZhYWRl" className="text-gray-600 hover:text-gray-900" title="Telegram">
              <Send size={20} />
            </a>
            <a href="https://twitter.com/wuliu_6" className="text-gray-600 hover:text-gray-900" title="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 pt-24">
        <Card className="mb-12 border-0 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                className="w-full p-3 text-lg border-0 border-b focus:ring-0 focus:border-gray-900 transition-colors"
                placeholder="标题"
              />
              <textarea
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                className="w-full p-3 min-h-32 border rounded-lg focus:ring-0 focus:border-gray-900 transition-colors"
                placeholder="写点什么..."
              />
              <div className="flex gap-4">
                <select
                  value={currentEntry.category}
                  onChange={(e) => setCurrentEntry({...currentEntry, category: e.target.value})}
                  className="border rounded-lg p-2"
                >
                  {categories.map(category => (
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
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Image size={16} className="mr-2" />
                  添加图片
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleVideoUrlAdd}
                >
                  <Video size={16} className="mr-2" />
                  添加视频
                </Button>
                <Button type="submit" className="w-32">
                  {editIndex === -1 ? '发布' : '更新'}
                </Button>
              </div>
              {currentEntry.images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {currentEntry.images.map((url, index) => (
                    <img 
                      key={index} 
                      src={url} 
                      alt={`预览图 ${index + 1}`} 
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              {currentEntry.videoUrl && renderVideoEmbed(currentEntry.videoUrl)}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {filteredEntries.map((entry, index) => (
            <article 
              key={entry.id} 
              className="p-6 bg-white rounded-lg border border-gray-100"
            >
              <header className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-medium mb-2">{entry.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {entry.date}
                    </span>
                    <span className="px-2 py-1 bg-gray-50 rounded">
                      {categories.find(c => c.id === entry.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setCurrentEntry({...entries[index]});
                      setEditIndex(index);
                    }}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const updatedEntries = entries.filter((_, i) => i !== index);
                      setEntries(updatedEntries);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </header>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
              {entry.images?.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {entry.images.map((url, idx) => (
                    <img 
                      key={idx} 
                      src={url} 
                      alt={`图片 ${idx + 1}`} 
                      className="max-w-full h-auto rounded"
                    />
                  ))}
                </div>
              )}
              {entry.videoUrl && renderVideoEmbed(entry.videoUrl)}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}