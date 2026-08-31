"use client";

import { useState } from "react";

import { Button, Input } from "@zmzai/theme";

export function RegisterForm({ next }: { next: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setBusy(false);
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(j.error ?? "注册失败");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <>
        <header className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Check your inbox
          </p>
          <h1 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
            验证邮件已发送
          </h1>
        </header>

        <p className="mt-5 text-sm leading-7 text-ink-2">
          我们已向 <strong className="font-semibold text-ink">{email}</strong>{" "}
          发送了验证链接，请打开邮件完成验证后再登录。
        </p>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="mt-8 w-full"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            window.location.href = `/login${next && next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`;
          }}
        >
          返回登录
        </Button>
      </>
    );
  }

  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Create account
        </p>
        <h1 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
          创建账号
        </h1>
        <p className="text-sm leading-6 text-ink-2">
          注册一次，zmzai.cloud 全站通用。
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-9 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink">昵称</span>
          <Input
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
            placeholder="怎么称呼你"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink">邮箱</span>
          <Input
            type="email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] font-medium text-ink">密码</span>
          <Input
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="••••••••••••"
          />
          <span className="text-xs text-ink-3">至少 8 位，含字母和数字</span>
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
          {busy ? "注册中…" : "注册"}
        </Button>
      </form>

      <p className="mt-8 text-[13px] text-ink-2">
        已有账号？{" "}
        <a
          href={`/login${next && next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          登录
        </a>
      </p>
    </>
  );
}
