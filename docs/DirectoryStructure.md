# Directory Structure

This project directory structure is based on following principles.
And please follow the rules below when creating a new file or directory.

```
This project
├── Dockerfile
├── README.md
├── components.json         // shadcn/ui components config
├── config
│   └── deploy              // cloud deploy config
├── docs                    // documentation
│   ├── ConsensusOverview.md
│   ├── DirectoryStructure.md
│   └── TechStack.md
├── jest.config.js
├── next-env.d.ts
├── next.config.js
├── orval.config.ts         // orval config
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── error
│   │   └── 404.svg
│   ├── favicon.png
│   ├── images
│   │   └── pageName
│   │       └── hero.svg
│   └── mockServiceWorker.js
├── shared
│   └── api
│       └── resources
│           ├── schemas
│           └── swagger.yaml
├── src                     // 設定やドキュメント以外の開発ファイルは原則srcディレクトリ配下に入れます
│   ├── api
│   │   ├── generated       // generated files from orval
│   │   │   ├── examples
│   │   │   ├── {project-name}.api.msw.ts
│   │   │   ├── {project-name}.api.schemas.ts
│   │   │   └── {project-name}.api.ts
│   │   └── httpClient.ts
│   ├── app
│   │   ├── api
│   │   │   └── auth        // basic auth for now (can be changed to jwt)
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── not-found.tsx   // global 404 page
│   │   ├── page.tsx
│   │   └── pageName
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── modules             // モジュール単位の分割（モジュラーモノリス構造）
│   │   ├── auth            // 認証関連のモジュール
│   │   │   ├── __tests__   // モジュールレベルのテスト
│   │   │   ├── api         // モジュール内のAPI
│   │   │   │   ├── client.ts
│   │   │   │   └── routes.ts
│   │   │   ├── components  // モジュール固有のコンポーネント
│   │   │   │   ├── __tests__  // コンポーネントのテスト
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks       // モジュール固有のhooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── index.ts
│   │   │   ├── stores      // モジュール固有の状態管理
│   │   │   │   └── authStore.ts
│   │   │   ├── utils       // モジュール固有のユーティリティ
│   │   │   │   ├── __tests__  // ユーティリティのテスト
│   │   │   │   └── session.ts
│   │   │   ├── types.ts    // モジュール内部の型定義
│   │   │   └── index.ts    // モジュールの公開インターフェース
│   │   └── example         // 例のモジュール
│   │       ├── __tests__   // モジュールレベルのテスト
│   │       ├── actions     // サーバーアクション
│   │       │   └── hello.ts
│   │       ├── components  // モジュール固有のコンポーネント
│   │       │   ├── __tests__  // コンポーネントのテスト
│   │       │   ├── Example.tsx
│   │       │   ├── ExampleAsyncActions.tsx
│   │       │   ├── ExampleOptimistic.tsx
│   │       │   ├── ExampleToaster.tsx
│   │       │   └── index.ts
│   │       ├── hooks
│   │       ├── stores      // モジュール固有の状態管理
│   │       │   └── exampleLocalStorageState.ts
│   │       ├── utils
│   │       ├── types.ts    // モジュール固有の型定義
│   │       └── index.ts    // モジュールの公開インターフェース
│   ├── shared              // 複数モジュールで共有される機能
│   │   ├── components      // 共通コンポーネント
│   │   │   ├── __tests__   // 共通コンポーネントのテスト
│   │   │   ├── layouts     // レイアウト関連コンポーネント
│   │   │   │   └── Header.tsx
│   │   │   ├── elements    // 要素コンポーネント
│   │   │   └── skeleton    // スケルトンコンポーネント
│   │   ├── ui              // 基本UIコンポーネント（shadcn/ui等）
│   │   │   ├── __tests__   // UIコンポーネントのテスト
│   │   │   ├── button.tsx
│   │   │   └── sonner.tsx
│   │   ├── hooks           // 共通hooks
│   │   │   ├── index.ts
│   │   │   ├── useDebounce.tsx
│   │   │   ├── useScroll.tsx
│   │   │   └── useUpdateEffect.ts
│   │   ├── stores          // 共有状態管理
│   │   │   ├── globalState.ts
│   │   │   ├── globalUIState.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── utils           // 共通ユーティリティ
│   │   │   ├── __tests__   // 共通ユーティリティのテスト
│   │   │   ├── index.ts
│   │   │   └── utils.ts
│   │   └── types           // 共通の型定義
│   │       └── globals.ts
│   ├── middleware.ts
│   ├── mocks               // mocks for msw
│   │   ├── api
│   │   │   └── endpoint.ts
│   │   ├── browser.ts
│   │   ├── db.ts
│   │   ├── handlers.ts
│   │   ├── server.ts
│   │   └── worker.ts
│   ├── provider            // providers for jotai, msw and tanstack
│   │   ├── jotai.tsx
│   │   ├── msw.tsx
│   │   └── tanstack.tsx
│   ├── tests               // 統合テストとE2Eテスト
│   │   ├── config          // テスト設定
│   │   │   └── jest.setup.ts
│   │   ├── integration     // モジュール間の統合テスト
│   │   └── e2e             // エンドツーエンドテスト
│   └── styles              // global styles
│       └── globals.css
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.spec.json
└── tsconfig.tsbuildinfo
```

## モジュラーモノリス構造の説明

本プロジェクトではモジュラーモノリスアーキテクチャを採用しています。これは、アプリケーションを独立したモジュール（境界付けられたコンテキスト）に分割し、各モジュールが独自のドメインロジック、データアクセス、プレゼンテーション層を持つ構造です。

### モジュール構造

各モジュールは`src/modules`ディレクトリに配置され、以下の構造を持ちます：

- \***\*tests**/\*\*: モジュールレベルのテスト
- **components/**: モジュール専用のUIコンポーネント
  - \***\*tests**/\*\*: コンポーネントのテスト
- **actions/**: サーバーアクション（Next.js Server Actions）
- **api/**: モジュール専用のAPIクライアントとサーバーサイド処理
- **hooks/**: モジュール専用のReact Hooks
- **stores/**: モジュール専用の状態管理（Jotai, Tanstack Query）
- **utils/**: モジュール専用のユーティリティ関数
  - \***\*tests**/\*\*: ユーティリティのテスト
- **types.ts**: モジュール内部の型定義
- **index.ts**: モジュールの公開インターフェース（外部に公開するAPIを定義）

### 共有リソース

複数のモジュールで共有されるコンポーネントやユーティリティは`src/shared`ディレクトリに配置されます：

- **components/**: 共通UIコンポーネント
  - \***\*tests**/\*\*: 共通コンポーネントのテスト
- **ui/**: 基本的なUIコンポーネント（shadcn/ui等）
  - \***\*tests**/\*\*: UIコンポーネントのテスト
- **hooks/**: 共通React Hooks
- **stores/**: 共通状態管理（グローバル状態）
- **utils/**: 共通ユーティリティ関数
  - \***\*tests**/\*\*: 共通ユーティリティのテスト
- **types/**: 共通の型定義

### テスト構造

テストは以下の構造で整理されています：

1. **コンポーネントレベルのテスト**:

   - 各コンポーネントディレクトリ内の`__tests__/`ディレクトリに配置
   - 例: `src/modules/auth/components/__tests__/Login.test.tsx`

2. **モジュールレベルのテスト**:

   - 各モジュールのルートにある`__tests__/`ディレクトリに配置
   - 例: `src/modules/auth/__tests__/auth.test.ts`

3. **統合テストとE2Eテスト**:

   - `src/tests/integration/`: モジュール間の統合テスト
   - `src/tests/e2e/`: エンドツーエンドテスト

4. **代替テスト配置方法**:
   - テストファイルをコンポーネントと同じディレクトリに`.test.tsx`または`.spec.tsx`の拡張子で配置することも可能
   - 例: `src/modules/auth/components/Login.test.tsx`

### モジュール間の依存関係

モジュール間の依存関係は明示的なインターフェースを通じてのみ行われます。各モジュールのルートにある`index.ts`ファイルが公開APIを定義し、他のモジュールはこのインターフェースを通じてのみアクセスします。これにより、モジュール間の結合度を低く保ち、モジュールの独立性と再利用性を高めます。

## ファイル作成のルール

新しいファイルやディレクトリを作成する際は、以下のルールに従ってください：

1. **機能の分類**: 機能がどのモジュールに属するかを明確にし、適切なモジュールディレクトリ内に配置します。
2. **共有リソース**: 複数のモジュールで使用される可能性があるコンポーネントやユーティリティは`src/shared`ディレクトリに配置します。
3. **公開インターフェース**: 各モジュールの`index.ts`ファイルには、外部に公開するAPIのみをエクスポートします。
4. **タイプ定義**: 型定義はモジュール内の`types.ts`に記述するか、共通の型は`src/shared/types`に配置します。
5. **テスト**: テストファイルは以下のいずれかの方法で配置します：
   - 対応するディレクトリ内の`__tests__`ディレクトリに配置（推奨）
   - 対応するファイルと同じディレクトリに`.test.ts`または`.spec.ts`の拡張子で配置
   - 統合テストやE2Eテストは`src/tests`ディレクトリに配置
