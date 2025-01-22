import React from 'react';
import { useRouter } from 'next/router';
import BlogComment from '../components/BlogComment';
import { ThumbsUp, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogDetail = ({ post }) => {
  const router = useRouter();
  const [likes, setLikes] = React.useState(0);

  // 如果页面正在加载，显示加载状态
  if (router.isFallback) {
    return <div className="p-4">加载中...</div>;
  }

  return (
    <article className="w-full max-w-4xl mx-auto px-4 py-8 md:px-0">
      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{post?.date}</span>
          <span>分类：{post?.category}</span>
          <span>阅读时间：{post?.readingTime}分钟</span>
        </div>
      </header>

      {/* 文章内容 */}
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
        {post?.content}
      </div>

      {/* 文章底部互动区 */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Button 
          variant="outline"
          onClick={() => setLikes(prev => prev + 1)}
          className="flex items-center gap-2"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            // TODO: 实现分享功能
            navigator.clipboard.writeText(window.location.href);
          }}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>分享</span>
        </Button>
      </div>

      {/* 分类和标签 */}
      <div className="mt-8 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 评论区组件 */}
      <BlogComment postId={post?.id} />
    </article>
  );
};

// 获取博客数据
export async function getStaticProps({ params }) {
  try {
    // TODO: 替换为实际的数据获取逻辑
    const post = {
      id: params.slug,
      title: '示例博客标题',
      content: '示例博客内容...',
      date: '2024-01-22',
      category: '技术',
      readingTime: 5,
      tags: ['JavaScript', 'React', 'Next.js'],
    };

    return {
      props: {
        post,
      },
      revalidate: 60, // 每60秒重新生成页面
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

// 生成可能的路径
export async function getStaticPaths() {
  // TODO: 替换为实际的数据获取逻辑
  const paths = [
    { params: { slug: 'first-post' } },
    { params: { slug: 'second-post' } },
  ];

  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;