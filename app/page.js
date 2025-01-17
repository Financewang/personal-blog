import BlogContent from './components/BlogContent'

export default function Home() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-lg sm:text-xl md:text-2xl">欢迎来到我的博客</h1>
      <p className="text-sm sm:text-base md:text-lg">
        这是一个响应式博客，根据屏幕尺寸调整文本大小。
      </p>
    </div>
  );
}
