'use client'

import { useEffect, useState } from 'react'

/**
 * クライアントサイドMSWプロバイダー
 * ブラウザ環境でMSWを初期化するためのプロバイダー
 */
const ClientMSWProvider = ({ children }: { children: React.ReactNode }) => {
  // MSWの初期化状態を管理
  const [isMswInitialized, setMswInitialized] = useState(false)

  useEffect(() => {
    // クライアントサイドでのみMSWを初期化
    const initMSW = async () => {
      // 開発環境でのみMSWを初期化
      if (
        process.env.NODE_ENV === 'development' &&
        process.env.MOCK_DISABLED !== 'true' &&
        typeof window !== 'undefined'
      ) {
        try {
          // MSWのブラウザモジュールとハンドラーをインポート
          const { setupWorker } = await import('msw/browser')
          const { handlers } = await import('../../mocks/handlers')

          // ワーカーを作成
          const worker = setupWorker(...handlers)

          // ワーカーを起動
          await worker.start({
            onUnhandledRequest: 'bypass', // 未処理のリクエストは通常通り処理
          })
          console.log('🔶 MSW Browser initialized')

          // グローバル変数にワーカーインスタンスを保存（クリーンアップ用）
          window.__mswWorker = worker

          // 初期化完了を記録
          setMswInitialized(true)
        } catch (error) {
          console.error('MSW Browser initialization failed:', error)
          setMswInitialized(false)
        }
      } else {
        // 開発環境でない場合は初期化しない
        setMswInitialized(true)
      }
    }

    // MSWを初期化
    initMSW()

    // クリーンアップ関数
    return () => {
      if (
        process.env.NODE_ENV === 'development' &&
        process.env.MOCK_DISABLED !== 'true' &&
        window.__mswWorker
      ) {
        // MSWワーカーを停止
        window.__mswWorker.stop()
        console.log('🔶 MSW Browser stopped')
      }
    }
  }, []) // 空の依存配列で初回レンダリング時のみ実行

  // 子コンポーネントをそのまま返す
  return <>{children}</>
}

export default ClientMSWProvider

// TypeScript用の型定義
declare global {
  interface Window {
    __mswWorker: any
  }
}
