# Figma デザイントークンの TailwindCSS v4 統合ガイド

このドキュメントでは、Figma で管理しているデザイントークンを TailwindCSS v4 の CSS 変数に自動変換し、shadcn/ui との互換性を保つ手順について説明します。

## 概要

- **Figma**: デザイントークンの管理とエクスポート
- **designtoken.json**: Figma からエクスポートされたトークンファイル
- **convert-design-tokens.js**: 変換スクリプト（shadcn/ui互換性対応）
- **src/styles/design-tokens.css**: 変換されたCSS変数（自動生成）
- **src/styles/globals.css**: design-tokens.cssをインポート

## 前提条件

1. Figma でデザイントークンが設定されている
2. Tokens Studio for Figma プラグインが使用可能
3. プロジェクトに TailwindCSS v4 が設定されている
4. shadcn/ui コンポーネントが使用されている

## ファイル構成

```
project-root/
├── designtoken.json              # Figma からエクスポートされたトークン
├── convert-design-tokens.js      # 変換スクリプト（ブリッジ変数対応）
├── src/styles/
│   ├── design-tokens.css         # 自動生成されるCSS変数ファイル
│   └── globals.css               # design-tokens.cssをインポート
└── docs/
    └── FigmaTokensIntegration.md  # このドキュメント
```

## 手順

### 1. Figma からデザイントークンをエクスポート

1. Figma で Tokens Studio プラグインを開く
2. "Export" ボタンをクリック
3. JSON 形式でエクスポート
4. `designtoken.json` として保存

### 2. 変換スクリプトの実行

```bash
# プレビュー（コンソール出力のみ）
node convert-design-tokens.js

# ファイルに出力（推奨）
node convert-design-tokens.js --write
```

このスクリプトは以下の処理を行います：

- `designtoken.json` を読み込み
- Primitives トークン（"1.-tailwindcss-default"）を除外
- Semantics トークンを TailwindCSS v4 の `@theme` ディレクティブに変換
- ライトモード（`@theme`）とダークモード（`@variant dark`）に分離
- **shadcn/ui互換性のためのブリッジ変数を自動生成**
- `src/styles/design-tokens.css` に自動出力
- `src/styles/globals.css` に自動的にインポートを追加

### 3. 生成される CSS 構造

`src/styles/design-tokens.css` には以下の構造で CSS が生成されます：

```css
/* TailwindCSS v4 Design Tokens */
@theme {
  --color-primary: var(--color-teal-500);
  --color-background: var(--color-base-white);
  --color-foreground: var(--color-neutral-950);
  /* ... その他のSemantic変数 */
}

@variant dark {
  --color-primary: var(--color-teal-100);
  --color-background: var(--color-neutral-950);
  --color-foreground: var(--color-neutral-50);
  /* ... ダークモード用変数 */
}

/* shadcn/ui互換性のためのブリッジ変数 */
:root {
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --primary: var(--color-primary);
  --primary-foreground: var(--color-primary-foreground);
  --secondary: var(--color-secondary);
  --secondary-foreground: var(--color-secondary-foreground);
  --muted: var(--color-muted);
  --muted-foreground: var(--color-muted-foreground);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-accent-foreground);
  --destructive: var(--color-destructive);
  --destructive-foreground: var(--color-destructive-foreground);
  --border: var(--color-border);
  --input: var(--color-input);
  --ring: var(--color-ring);
  --card: var(--color-card);
  --card-foreground: var(--color-card-foreground);
  --popover: var(--color-popover);
  --popover-foreground: var(--color-popover-foreground);
  /* ... その他のshadcn/ui標準変数 */
}
```

## shadcn/ui との互換性

### ブリッジ変数システム

変換スクリプトは自動的に shadcn/ui の標準変数とデザイントークンを接続するブリッジ変数を生成します：

- **Figmaデザイントークン**: `--color-primary` 形式
- **shadcn/ui標準変数**: `--primary` 形式
- **ブリッジ変数**: `--primary: var(--color-primary)`

これにより以下が実現されます：

1. **既存のshadcn/uiコンポーネントがそのまま動作**
2. **Figmaのデザイン変更が自動的にコンポーネントに反映**
3. **コードの変更不要**

### 使用例

```typescript
// Sonner コンポーネントの例
<Sonner
  toastOptions={{
    actionButtonStyle: {
      backgroundColor: 'var(--primary)', // Figmaの色が自動適用
    },
  }}
/>
```

## デザイントークンの構造

### Figma トークンの構造

```json
{
  "1.-tailwindcss-default": {
    // TailwindCSS Primitives（除外対象）
    "color": { "teal": { "500": { "value": "#14b8a6" } } }
  },
  "2.-theme-default": {
    // Semantics 基本定義
    "colors": {
      "primary-light": { "value": "{color.teal.500}" },
      "primary-dark": { "value": "{color.neutral.200}" }
    }
  }
}
```

### 変換後の CSS 変数

```css
/* TailwindCSS v4 @theme ディレクティブ */
@theme {
  --color-primary: var(--color-teal-500);
}

@variant dark {
  --color-primary: var(--color-neutral-200);
}

/* shadcn/ui互換ブリッジ変数 */
:root {
  --primary: var(--color-primary);
}
```

## Typography トークンについて

現在の変換スクリプトは**カラートークンのみ**を対象としています。

### Typography トークンの扱い

**現在の方針:**
- Figma の typography トークン（`text.xs` など）は変換対象外
- TailwindCSS の標準 typography クラス（`text-xs`, `text-sm` など）を直接使用
- これにより管理コストを削減し、一貫性を保持

**将来の拡張案:**
- Semantic な命名（`h1`, `h2`, `body`, `caption` など）でのtypography変換
- プロジェクト固有のタイポグラフィスケールが必要な場合のみ実装

## 注意事項

1. **Primitives の除外**: TailwindCSS にデフォルトで含まれる色は除外
2. **参照の解決**: `{color.xxx}` 形式の参照を `var(--color-xxx)` に変換
3. **shadcn/ui 互換性**: ブリッジ変数により既存コンポーネントとの互換性を保持
4. **自動ファイル管理**: `--write` オプションで自動的にファイル生成・更新

## トラブルシューティング

### よくある問題

1. **shadcn/ui コンポーネントで色が適用されない**
   - ブリッジ変数が正しく生成されているか確認
   - `src/styles/design-tokens.css` が `globals.css` にインポートされているか確認

2. **TailwindCSS に存在しない色の参照**
   - スクリプトが警告を表示
   - カスタムカラーの追加が必要

3. **変換後の色が期待通りでない**
   - Figma での参照設定を確認
   - トークンの階層構造を見直し

4. **ダークモードで色が適用されない**
   - `@variant dark` の設定を確認
   - CSS 変数の上書きを確認

## 更新サイクル

1. **デザイン更新** → Figma でトークン修正
2. **エクスポート** → `designtoken.json` 更新
3. **変換実行** → `node convert-design-tokens.js --write`
4. **確認** → アプリケーションでの表示確認（ファイル統合は自動）

## ベストプラクティス

### デザイントークンの命名

1. **Semantic命名を使用**
   - ✅ `primary`, `secondary`, `background`
   - ❌ `blue-500`, `gray-200`

2. **用途を明確に**
   - ✅ `button-primary`, `text-muted`
   - ❌ `color-1`, `color-2`

3. **一貫性を保持**
   - Light/Dark のペアを必ず定義
   - 命名規則を統一

### コードでの使用

1. **Semantic色のみ使用**
   ```css
   /* ✅ 推奨 */
   background: hsl(var(--color-primary));
   color: hsl(var(--color-foreground));
   
   /* ❌ 禁止 */
   background: hsl(var(--color-blue-500));
   color: #333333;
   ```

2. **shadcn/ui標準変数の活用**
   ```typescript
   // ✅ 推奨（ブリッジ変数経由で自動的にFigmaの色が適用）
   backgroundColor: 'var(--primary)'
   
   // ❌ 冗長
   backgroundColor: 'hsl(var(--color-primary))'
   ```

このようにして、デザインシステムの一貫性を保ちながら、効率的なワークフローを構築できます。