import type { ReactNode } from "react";

import { BrandLockup } from "@zmzai/theme";

import { allProducts } from "@/lib/products";

/**
 * AuthShell — 认证页外壳（login / register / verify-email 共用）。
 *
 * 两栏：左是墨底叙事区，右是纯白表单区。
 *
 * 为什么用墨底分栏：BRAND.md §7.13 把深色叙事区定为彩色的唯一出口，
 * 白底界面永远保持墨骨单色。认证页没有内容可铺，一栏墨底既给了品牌
 * 一个落位，又不用往表单上贴装饰——比"白底 + 居中卡片"更有分量，
 * 也比给卡片加渐变/描边克制。墨底上不用品红：这是工具页，不是叙事落地页。
 *
 * 移动端墨底栏隐藏，品牌锁标下移到表单区顶部补位。
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      {/* ═══ 左：墨底叙事区 ═══ */}
      <aside className="hidden flex-col justify-between bg-dark-bg px-10 py-12 lg:flex xl:px-16">
        <BrandLockup tone="dark" sublabel="auth" />

        <div className="flex flex-col gap-6 py-16">
          <p className="font-serif text-[2rem] font-bold leading-[1.3] tracking-tight text-dark-ink xl:text-[2.5rem]">
            一次登录，
            <br />
            全站通用。
          </p>
          <p className="max-w-sm text-sm leading-7 text-dark-ink/60">
            知末智云把一套经过真实业务验证的闭环开源出来：
            发布、信任、权益、交付。内容、交易和用户关系，都握在你自己手里。
          </p>
        </div>

        {/* 家族索引 — 用内容密度代替装饰（BRAND.md §7.12） */}
        <div className="flex flex-col gap-4">
          <span className="h-px w-full bg-dark-line" />
          <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.14em] text-dark-ink/40">
            {allProducts.map((p) => p.name).join(" · ")}
          </p>
        </div>
      </aside>

      {/* ═══ 右：纯白表单区 ═══ */}
      <section className="flex flex-col justify-center px-6 py-14 sm:px-12">
        <div className="mx-auto flex w-full max-w-[22rem] flex-col">
          <div className="mb-10 lg:hidden">
            <BrandLockup sublabel="auth" />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
