/**
 * サーバーサイドMSWプロバイダー
 * サーバーコンポーネントでMSWを初期化するためのプロバイダー
 */

// サーバーサイドでのみ実行される初期化コード
if (
  typeof window === 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.MOCK_DISABLED !== 'true'
) {
  // サーバーサイドMSWの初期化を即時実行関数で行う
  ;(async () => {
    try {
      // MSWのサーバーモジュールとハンドラーをインポート
      const { setupServer } = await import('msw/node')
      const { handlers } = await import('../../mocks/handlers')
      // サーバーインスタンスを作成
      const server = setupServer(...handlers)

      // サーバーを起動
      server.listen({ onUnhandledRequest: 'bypass' })
      console.log('🔶 MSW Server initialized')

      // プロセス終了時のクリーンアップ
      process.on('beforeExit', () => {
        server.close()
        console.log('🔶 MSW Server stopped')
      })

      // グローバル変数にサーバーインスタンスを保存（必要に応じて）
      global.__mswServer = server
    } catch (error) {
      console.error('MSW Server initialization failed:', error)
    }
  })()
}

export default function ServerMSWProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// TypeScript用の型定義
declare global {
  var __mswServer: any
}
