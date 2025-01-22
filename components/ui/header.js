import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Finance Wang's Blog
        </Link>
        <nav className="space-x-4">
          <Link href="/category/personal">个人记录</Link>
          <Link href="/category/finance">财务管理</Link>
          <Link href="/category/business">创业</Link>
          <Link href="/category/thoughts">思考</Link>
          {isLoggedIn ? (
            <Link href="/admin/new-post" className="bg-white text-blue-500 px-4 py-2 rounded">
              写文章
            </Link>
          ) : (
            <Link href="/login" className="bg-white text-blue-500 px-4 py-2 rounded">
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}