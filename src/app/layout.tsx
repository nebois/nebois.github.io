import type { Metadata } from 'next'
import './globals.css'
import AppLayout from '@/components/layout/AppLayout'
import ThemeProvider from '@/components/layout/ThemeProvider'

export const metadata: Metadata = {
  title: 'Nebois - 个人主页',
  description: '个人技术文档、游戏娱乐、占卜测试平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
