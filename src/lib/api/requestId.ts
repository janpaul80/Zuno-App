import { randomUUID } from 'crypto';

export function generateRequestId(): string {
  return randomUUID();
}

export function extractRequestId(req: Request): string | null {
  const headerId = req.headers.get('x-request-id');
  return headerId || null;
}
