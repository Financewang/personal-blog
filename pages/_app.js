import AuthProvider from '../contexts/AuthContext'; // 确保路径正确
import Navbar from '../app/components/Navbar'; // 确保路径正确
import '../styles/globals.css'; // 引入全局样式

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
