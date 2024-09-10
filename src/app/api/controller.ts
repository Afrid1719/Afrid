import { isAllowed } from "@/utils/access";
import { badRequest, serverError, unauthorized } from "@/utils/response";
import { NextRequest } from "next/server";
import { z } from "zod";

/**
 * Wraps a controller function with authentication check and error handling.
 * If the user is not authenticated, returns 401 Unauthorized.
 * If the user is authenticated, calls the provided function and
 * returns its result. If the function throws a ZodError, returns 400 Bad Request
 * with the error messages. If the function throws any other error, returns
 * 500 Internal Server Error with the error message.
 * @param req - The NextRequest object
 * @param fn - The controller function to wrap
 */
export async function authorizedController(req: NextRequest, fn: Awaited<any>) {
  if (!(await isAllowed(req))) {
    return unauthorized();
  }
  try {
    return await fn();
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return badRequest(error.errors.map((err) => err.message).join("\n"));
    }
    return serverError(error as Error);
  }
}

/**
 * Wraps a controller function with error handling.
 * If the function throws a ZodError, returns 400 Bad Request
 * with the error messages. If the function throws any other error, returns
 * 500 Internal Server Error with the error message.
 * @param req - The NextRequest object
 * @param fn - The controller function to wrap
 */
export async function unauthorizedController(fn: Awaited<any>) {
  try {
    return await fn();
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return badRequest(error.errors.map((err) => err.message).join("\n"));
    }
    return serverError(error as Error);
  }
}
