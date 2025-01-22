import '../styles/globals.css'

export const metadata = {
  title: "Finance Wang's Blog",
  description: '我的个人博客',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}