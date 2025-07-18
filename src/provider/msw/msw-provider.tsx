import dynamic from 'next/dynamic'
import ServerMSWProvider from './server-msw'

// クライアントサイドMSWプロバイダーを動的にインポート（サーバーサイドレンダリング時にはインポートしない）
const ClientMSWProvider = dynamic(() => import('./msw'), { ssr: false })

/**
 * 統合MSWプロバイダー
 * サーバーサイドとクライアントサイドの両方でMSWを初期化するためのプロバイダー
 *
 * 使用方法:
 * 1. layout.tsxなどのルートコンポーネントでこのプロバイダーをラップする
 * 2. 開発環境でのみMSWが有効になり、本番環境では何も行わない
 * 3. process.env.MOCK_DISABLED=true を設定することで開発環境でもMSWを無効化できる
 */
export default function MSWProvider({ children }: { children: React.ReactNode }) {
  return (
    <ServerMSWProvider>
      <ClientMSWProvider>{children}</ClientMSWProvider>
    </ServerMSWProvider>
  )
}
