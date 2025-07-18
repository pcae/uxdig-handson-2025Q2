# デザインガイドライン MCP サーバー ルール

## デザインシステムについて

### 原則

- shadcn/ui をベースとした Figma ファイルとコードがセットになっている
- 命名規則も統一されており、Figma のコンポーネント名がソースコード上のコンポーネント名、または shadcn/ui のコンポーネント名と紐づいている

### Variables について

- ColorSchema は Primitives と Semantics に分かれている
  - Primitives の値を Semantics に指定し利用するように設計されているため、ソースコード上で利用する値は原則 Semantics のみ利用すること
  - Primitives は TailwindCSS の Color と紐づいている
  - Semantics は Figma の variables に定義している値と `src/styles/globals.css` 内の CSS 変数が紐づいているため、原則 Figma に設定されている variables を元に CSS 変数を特定し利用すること

#### 詳細ルール

##### 必須事項

- **Primitive 色（gray-500, blue-600, slate-100 等）の直接使用を厳格に禁止**
- **必ず Semantic 色のみを使用すること**
  - Semantics は `src/styles/globals.css` 内に存在している CSS 変数
- 違反した場合は即座に修正を要求
- Figma で指定された Semantics とソースコード上での Semantics で色が異なる場合はその都度報告し、承認を得ること

##### 使用例

**✅ 正しい使用例:**

```typescript
// テキストの色分け
<h1 className="text-foreground">メインタイトル</h1>
<p className="text-muted-foreground">説明文</p>

// 背景とボーダー
<div className="bg-card border border-border">
   <input className="bg-background border-input" />
</div>

// ボタン
<Button className="bg-primary text-primary-foreground">

❌ 禁止されている使用例:
// Primitive色の直接使用は禁止
<p className="text-gray-500">❌ 禁止</p>
<div className="bg-slate-100 border-gray-200">❌ 禁止</div>
<Button className="bg-blue-600 text-white">❌ 禁止</Button>
```

実装時の確認事項

1. 使用する色がすべて上記の Semantic 色リストに含まれているか
2. src/styles/globals.css で CSS 変数が定義されているか
3. ライト・ダークモード両方で適切に表示されるか

新しい Semantic 色が必要な場合

- デザインシステム担当者に相談
- Figma Variables → CSS 変数 → Tailwind 設定の順で追加
- 勝手に Primitive 色を使用してはいけない

---
