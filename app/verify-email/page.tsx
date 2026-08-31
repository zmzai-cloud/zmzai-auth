"use client";

import { useEffect, useState } from "react";

import { Button } from "@zmzai/theme";

import { AuthShell } from "../auth-shell";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const [state, setState] = useState<"verifying" | "verified" | "error">("verifying");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const params = await searchParams;
      if (!params.token) {
        setState("error");
        setError("缺少验证令牌");
        return;
      }
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token }),
      });
      if (res.ok) {
        setState("verified");
      } else {
        const j = await res.json().catch(() => ({}));
        setState("error");
        setError(j.error ?? "验证失败");
      }
    })();
  }, [searchParams]);

  const copy = {
    verifying: { title: "正在验证…", desc: "正在核对你的邮箱验证链接。" },
    verified: { title: "验证成功", desc: "你的邮箱已通过验证，可以登录了。" },
    error: { title: "验证失败", desc: error ?? "请重新获取验证链接后再试。" },
  }[state];

  return (
    <AuthShell>
      <header className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Email verification
        </p>
        <h1 className="font-serif text-[1.75rem] font-bold leading-tight tracking-tight text-ink">
          {copy.title}
        </h1>
      </header>

      <p
        className={`mt-5 text-sm leading-7 ${
          state === "error" ? "text-danger" : "text-ink-2"
        }`}
      >
        {copy.desc}
      </p>

      {state !== "verifying" ? (
        <Button
          size="lg"
          variant={state === "verified" ? "primary" : "secondary"}
          className="mt-8 w-full"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          {state === "verified" ? "去登录" : "返回登录"}
        </Button>
      ) : null}
    </AuthShell>
  );
}
