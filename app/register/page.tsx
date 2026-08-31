import { redirect } from "next/navigation";

import { getCurrentUser } from "@/providers/auth/session";
import { safeNext } from "@/providers/auth/redirect";

import { AuthShell } from "../auth-shell";
import { RegisterForm } from "./register-form";

export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);

  const user = await getCurrentUser();
  if (user) {
    redirect(next);
  }

  return (
    <AuthShell>
      <RegisterForm next={next} />
    </AuthShell>
  );
}
