import { type Request, type Response, type NextFunction } from 'express';

/**
 * Global error handler — sends a consistent JSON error response.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[Error]', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env['NODE_ENV'] !== 'production' && { error: err.message }),
  });
}
