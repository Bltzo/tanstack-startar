import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AuthLayout } from "~/components/auth/AuthLayout";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    if (context.session?.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthHome,
});

function AuthHome() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
