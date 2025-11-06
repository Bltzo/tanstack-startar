/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtools } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";

import type { AppSession } from "~/utils/session";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { Toaster } from "~/components/ui/sonner";
import { getLocale } from "~/i18n/runtime";
import { getUserProfileQuery } from "~/queries/user";
import { getUserSession } from "~/server/auth.server";
import appCss from "~/styles.css?url";
import { seo } from "~/utils/seo";

interface AppRouterContext {
  session?: AppSession;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  beforeLoad: async () => {
    const session = (await getUserSession()) as AppSession | undefined;
    return {
      session,
    };
  },
  loader: async ({ context }) => {
    const { session, queryClient } = context;
    if (session && session.isAuthenticated) {
      await queryClient.ensureQueryData(getUserProfileQuery);
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Tanstack Startar",
        description:
          "A starter template for building full-stack applications with Tanstack Router, React Query, and React Startar.",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
        rel: "stylesheet",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: () => <Outlet />,
  shellComponent: RootDocument,
});

interface RootDocumentProps {
  children: ReactNode;
}

function RootDocument({ children }: RootDocumentProps) {
  return (
    <html
      suppressHydrationWarning
      lang={getLocale()}
      dir={getLocale().startsWith("ar") ? "rtl" : "ltr"}
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" enableColorScheme enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
        <Suspense fallback={null}>
          <TanStackDevtools
            config={{
              position: "bottom-left",
              openHotkey: [""], // disable default hotkey (shift + a)
            }}
            plugins={[
              {
                name: "TanStack Form",
                render: <FormDevtools />,
                defaultOpen: true,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: false,
              },
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
                defaultOpen: true,
              },
            ]}
          />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
