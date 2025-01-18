import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext'; // 确保路径正确
import { useRouter } from 'next/router';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/'); // 注销后跳转到首页
  };

  return (
    <nav style={{ background: '#0070f3', padding: '1rem', color: 'white' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0 }}>
        {isAuthenticated ? (
          <>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </li>
            <li>
              <Link href="/dashboard">
                <a style={{ color: 'white' }}>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/create-post">
                <a style={{ color: 'white' }}>Create Post</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <a style={{ color: 'white' }}>Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
