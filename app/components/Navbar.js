import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext'; // 确保路径正确

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // 判断是否登录

  return (
    <nav
      style={{
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/">
            <a style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/personal">
            <a style={{ color: 'white', textDecoration: 'none' }}>个人记录</a>
          </Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/finance">
            <a style={{ color: 'white', textDecoration: 'none' }}>财务管理</a>
          </Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/business">
            <a style={{ color: 'white', textDecoration: 'none' }}>创业</a>
          </Link>
        </li>
        <li style={{ marginRight: '1rem' }}>
          <Link href="/thoughts">
            <a style={{ color: 'white', textDecoration: 'none' }}>思考</a>
          </Link>
        </li>
      </ul>

      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        {isAuthenticated ? (
          <>
            <li style={{ marginRight: '1rem' }}>
              <Link href="/dashboard">
                <a style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
              </Link>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <Link href="/create-post">
                <a style={{ color: 'white', textDecoration: 'none' }}>Create Post</a>
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <a style={{ color: 'white', textDecoration: 'none' }}>Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
