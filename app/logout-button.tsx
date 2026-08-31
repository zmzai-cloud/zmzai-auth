"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
      }}
      className="inline-flex h-8 items-center rounded-sm border border-line px-3.5 font-mono text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      退出登录
    </button>
  );
}
