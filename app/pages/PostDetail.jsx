import React, { useState } from 'react';
import { likePost, commentOnPost } from '../api/posts'; // 调用封装好的 API 方法

const PostDetail = ({ post }) => {
    const [comment, setComment] = useState('');

    const handleLike = async () => {
        try {
            await likePost(post.id); // 点赞
            alert('点赞成功！');
        } catch (error) {
            alert('点赞失败，请稍后重试！');
        }
    };

    const handleComment = async () => {
        try {
            await commentOnPost(post.id, comment); // 添加评论
            alert('评论成功！');
        } catch (error) {
            alert('评论失败，请稍后重试！');
        }
    };

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={handleLike}>点赞</button>
            <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="输入评论"
                ></textarea>
                <button onClick={handleComment}>发表评论</button>
            </div>
        </div>
    );
};

export default PostDetail;
