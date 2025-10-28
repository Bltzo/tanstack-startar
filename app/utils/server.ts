import { setResponseStatus } from "@tanstack/react-start/server";
import { isAxiosError } from "axios";

import { getMessageFromError } from "./error";

export function errorResponse(error: unknown, code: number = 400) {
  if (isAxiosError(error)) {
    const statusCode = error.response?.status ?? code;
    const data = error.response?.data;
    setResponseStatus(statusCode);
    return data;
  }

  setResponseStatus(code);
  return {
    status: code,
    message: getMessageFromError(error),
  };
}
