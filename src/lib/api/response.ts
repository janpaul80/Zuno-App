import { NextResponse } from "next/server";

export type ApiSuccessResponse<T> = {
  ok: true;
  data: T;
};

export type ApiErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

type ApiResponseInit = {
  status?: number;
  headers?: HeadersInit;
};

export function successResponse<T>(data: T, init: ApiResponseInit = {}) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    {
      ok: true,
      data,
    },
    {
      status: init.status ?? 200,
      headers: init.headers,
    },
  );
}

export function errorResponse(
  code: string,
  message: string,
  init: ApiResponseInit & { details?: unknown } = {},
) {
  return NextResponse.json<ApiErrorResponse>(
    {
      ok: false,
      error: {
        code,
        message,
        details: init.details,
      },
    },
    {
      status: init.status ?? 400,
      headers: init.headers,
    },
  );
}
