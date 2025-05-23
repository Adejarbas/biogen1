import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
        isSuperAdmin?: boolean;
      };
    }
  }
}