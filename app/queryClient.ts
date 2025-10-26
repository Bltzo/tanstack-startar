import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import superjson from "superjson";

import * as m from "~/i18n/messages";
import { getMessageFromError } from "~/utils/error";

function onError(error: Error) {
  if (typeof error.message === "string") {
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.body) {
        error.message =
          typeof parsed.body === "string"
            ? parsed.body
            : (parsed.body?.result?.message ??
              parsed.body?.issues
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ?.map((m: any) => m?.message)
                .filter(Boolean)
                .join(", ") ??
              parsed.body?.message ??
              parsed.message ??
              error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      console.log("Failed to parse error message", error.message);
      // noop
    }
  }
  toast(m.notificationErrorTitle(), {
    description: getMessageFromError(error),
  });
}

function makeQueryClient(): QueryClient {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },

      queries: {
        refetchOnReconnect: () => !queryClient.isMutating(),
      },
    },
    queryCache: new QueryCache({
      onError,
    }),
    mutationCache: new MutationCache({
      onError,
      onSettled: () => {
        if (queryClient.isMutating() === 1) {
          return queryClient.invalidateQueries({
            exact: false,
            type: "all",
          });
        }
      },
    }),
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();
