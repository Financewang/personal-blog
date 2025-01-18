// 文件路径：/app/api/posts.js
import apiClient from '../utils/axios'; // 确保路径正确

// 封装点赞请求
export const likePost = async (postId) => {
    return apiClient.post(`/posts/${postId}/like`);
};

// 封装评论请求
export const commentOnPost = async (postId, commentText) => {
    return apiClient.post(`/posts/${postId}/comments`, { text: commentText });
};
