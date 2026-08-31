import Link from "next/link";
import { redirect } from "next/navigation";

import { Navbar } from "@zmzai/theme";
import { allProducts, statusLabel, type ProductStatus } from "@/lib/products";
import { getCurrentUser } from "@/providers/auth/session";
import { safeNext } from "@/providers/auth/redirect";

import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const { next } = await searchParams;

  if (!user) {
    // 未登录 → 登录页；带上 next 让登录后能跳回来源子站
    const target = safeNext(next);
    redirect(target === "/" ? "/login" : `/login?next=${encodeURIComponent(target)}`);
  }

  // 已登录 + 从子站带 next 过来 → 直达来源站，不停在通用落地页
  if (next) {
    redirect(safeNext(next));
  }

  return (
    <>
      <Navbar
        sublabel="auth"
        brandHref="/"
        badge={
          <span className="hidden rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink-3 sm:inline-block">
            auth.zmzai.cloud
          </span>
        }
        actions={<LogoutButton />}
      />

      <main className="page-shell flex flex-col pb-20 pt-14 sm:pt-20">
        {/* 问候 — 左对齐 Editorial，不放巨型字母标（BRAND.md §7.5） */}
        <section className="flex flex-col gap-4">
          <p className="eyebrow">已登录 · signed in</p>
          <h1 className="headline text-4xl sm:text-5xl">你好，{user.name}</h1>
          <p className="font-mono text-xs text-ink-3">
            {user.email} · {user.role}
          </p>
          <p className="max-w-xl pt-2 text-base leading-8 text-ink-2">
            一次登录，zmzai.cloud 全站通用。下面这些产品都认这个身份——
            点进去不用再登录第二次。
          </p>
        </section>

        {/* 现在可用 — 编号清单，不用四张图标方块卡（BRAND.md §7.6） */}
        <section className="mt-16 flex flex-col gap-4 sm:mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="headline text-2xl">现在可用</h2>
            <span className="eyebrow">进入一个产品，开始工作</span>
          </div>

          <ol className="flex flex-col divide-y divide-line border-y-2 border-rule">
            {allProducts.map((p, i) => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className="group grid gap-x-6 gap-y-1 py-6 sm:grid-cols-[2rem_9rem_1fr_auto] sm:items-baseline"
                >
                  <span className="font-mono text-xs text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="headline text-xl transition-colors group-hover:text-accent">
                    {p.name}
                  </span>
                  <span className="text-sm leading-7 text-ink-2">
                    <span className="text-ink-3">{p.hanzi}</span> · {p.tagline}
                  </span>
                  <span className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.14em]">
                    <StatusTag status={p.status} />
                    <span className="text-ink-3 transition-colors group-hover:text-ink">
                      进入 →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <LogoutButton />
          <span className="font-mono text-xs text-ink-3">
            身份由 auth.zmzai.cloud 签发，退出对所有子域同时生效。
          </span>
        </footer>
      </main>
    </>
  );
}

/**
 * 状态标签 — 语义色只表达状态，不做装饰。
 * live 用语义绿（运行中）；building / planned 留在墨骨灰阶里，
 * 不借用告警色，免得"在建"被读成"告警"（BRAND.md §7.3）。
 */
function StatusTag({ status }: { status: ProductStatus }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-live">
        <span className="size-1.5 rounded-full bg-live" />
        {statusLabel(status)}
      </span>
    );
  }
  return (
    <span className={status === "building" ? "text-ink-2" : "text-ink-3"}>
      {statusLabel(status)}
    </span>
  );
}
