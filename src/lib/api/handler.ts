import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from './response';
import { ApiError } from './errors';
import { generateRequestId, extractRequestId } from './requestId';

// Generic API handler wrapper
export async function apiHandler<T>(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<T>,
) {
  const requestId = extractRequestId(req) ?? generateRequestId();

  try {
    const data = await handler(req);
    return successResponse({ requestId, data });
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      return errorResponse(err.code, err.message, {
        status: err.status,
        details: { requestId, ...(err.details ? { details: err.details } : {}) },
      });
    }

    console.error('Unhandled API error:', err);

    return errorResponse('INTERNAL_ERROR', 'An unexpected error occurred', {
      status: 500,
      details: { requestId },
    });
  }
}
