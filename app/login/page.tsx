import { redirect } from "next/navigation";

import { getCurrentUser } from "@/providers/auth/session";
import { safeNext } from "@/providers/auth/redirect";

import { AuthShell } from "../auth-shell";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);

  // 已有登录态 → 直接跳回来源子站（无 next 则回落地页），不重复登录
  const user = await getCurrentUser();
  if (user) {
    redirect(next);
  }

  return (
    <AuthShell>
      <LoginForm next={next} error={params.error} />
    </AuthShell>
  );
}
