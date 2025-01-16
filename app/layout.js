import './globals.css'

export const metadata = {
  title: 'Personal Blog',
  description: 'My personal blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}