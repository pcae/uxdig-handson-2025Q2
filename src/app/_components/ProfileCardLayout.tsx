import React from "react";

/**
 * プロフィールカード画面の全体レイアウト・ベース構造
 *
 * - KDSデザインガイドライン・global.mdcのセマンティックカラーを利用
 * - 各セクション（ヘッダー、自己紹介、経歴、連絡先）は今後追加予定
 */
const ProfileCardLayout: React.FC = () => {
  return (
    <div className="bg-background rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] p-10 max-w-[650px] mx-auto flex flex-col items-center">
      {/* ヘッダーエリア（アバター・名前・サブテキスト・ウェブサイトラベル） */}
      <section className="w-full mb-8">
        {/* 今後実装 */}
      </section>

      {/* 自己紹介セクション */}
      <section className="w-full mb-8">
        {/* 今後実装 */}
      </section>

      {/* 経歴セクション */}
      <section className="w-full mb-8">
        {/* 今後実装 */}
      </section>

      {/* 連絡先セクション */}
      <section className="w-full">
        {/* 今後実装 */}
      </section>
    </div>
  );
};

export default ProfileCardLayout; 