"use client";

import { useEffect, useState } from "react";

import { Button, Input } from "@zmzai/theme";

export function LoginForm({ next, error: paramError }: { next: string; error?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OAuth 回调失败时把 ?error= 映射成中文提示
  useEffect(() => {
    if (!paramError) return;
    const map: Record<string, string> = {
      github_invalid_request: "GitHub 登录请求无效",
      github_invalid_state: "GitHub 登录状态已过期，请重试",
      github_state_mismatch: "GitHub 登录状态校验失败，请重试",
      github_exchange_failed: "GitHub 授权失败，请重试",
      github_no_verified_email: "你的 GitHub 账号没有已验证的主邮箱，无法登录",
      github_resolve_failed: "GitHub 账号解析失败，请重试",
      github_rate_limited: "GitHub 登录尝试过多，请稍后再试",
      account_disabled: "账号已禁用",
    };
    setError(map[paramError] ?? "登录失败");
  }, [paramError]);

  const githubHref = `/api/auth/github?next=${encodeURIComponent(next)}`;
  const registerHref = `/register${next && next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, next }),
    });
    setBusy(false);
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(j.error ?? "登录失败");
      return;
    }
    // 跳回来源子域
    window.location.href = j.next ?? "/";
  }

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Sign in
        </p>
        <h1 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
          登录
        </h1>
        <p className="text-sm leading-6 text-ink-2">
          一次登录，通行 zmzai.cloud 全部产品。
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-9 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink">邮箱</span>
          <Input
            type="email"
            size="lg"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink">密码</span>
          <Input
            type="password"
            size="lg"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        {error ? (
          <p role="alert" className="border-l-2 border-danger pl-3 text-[13px] leading-6 text-danger">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={busy}
          className="mt-1 w-full"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {busy ? "登录中…" : "登录"}
        </Button>
      </form>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">或</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <a
        href={githubHref}
        className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-sm border border-line text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <GitHubMark />
        使用 GitHub 登录
      </a>

      <p className="mt-8 text-[13px] text-ink-2">
        还没有账号？{" "}
        <a href={registerHref} className="font-medium text-ink underline underline-offset-4 transition-opacity hover:opacity-60">
          注册
        </a>
      </p>
    </>
  );
}

/** GitHub 官方 mark（16px 网格，与按钮文字同色）。 */
function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
