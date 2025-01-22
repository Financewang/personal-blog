import React, { useState } from 'react';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { MessageCircle } from 'lucide-react';

const BlogComment = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      content: comment,
      author: '访客用户',
      createdAt: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 md:px-0">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-xl font-semibold">评论区</h2>
        <span className="text-gray-500">({comments.length})</span>
      </div>

      {/* 评论输入框 */}
      <form onSubmit={handleSubmitComment}>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="写下你的想法..."
          className="min-h-24 mb-4"
        />
        <Button type="submit" className="float-right">
          发表评论
        </Button>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6 mt-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <Avatar>
              <span className="font-medium">{comment.author[0]}</span>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComment;