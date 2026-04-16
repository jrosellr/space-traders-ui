import { Observable, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export interface RawResponse<T> {
  data?: T;
  error?: Error;
}

export interface SuccessResponse<T> {
  status: "success";
  data: T;
}

export interface ErrorResponse<T> {
  status: "failure";
  error: T;
}

export interface Error {
  code: number;
  message: string;
  data: unknown;
  requestId: string;
}

export type Response<TResponse> = SuccessResponse<TResponse> | ErrorResponse<Error>;

export function fromRaw<T>(rawResponse: RawResponse<T>): Response<T> {
  if (rawResponse.data !== undefined) {
    return {
      status: "success",
      data: structuredClone(rawResponse.data),
    };
  }

  if (rawResponse.error !== undefined) {
    return {
      status: "failure",
      error: structuredClone(rawResponse.error),
    };
  }

  throw new Error("Request state is invalid.");
}

export function handleError<T>(error: unknown): Observable<Response<T> | undefined> {
  if (error instanceof HttpErrorResponse) {
    // Network error or timeout
    if (error.status === 0) {
      console.error(error);
      return of(undefined);
    }

    return of(fromRaw(error.error as RawResponse<T>));
  }

  // Any other runtime error
  console.error(error);
  return of(undefined);
}
