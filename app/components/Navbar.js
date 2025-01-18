import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext'; // 确保路径正确

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // 判断是否登录

  return (
    <nav style={{ backgroundColor: '#0070f3', color: 'white', padding: '1rem' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none', margin: 0 }}>
        <li>
          <Link href="/">
            <a style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <Link href="/dashboard">
                <a style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
              </Link>
            </li>
            <li>
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
            <Link href="/about">
              <a style={{ color: 'white', textDecoration: 'none' }}>About</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
