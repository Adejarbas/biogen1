import express, { Request, Response, NextFunction } from 'express';
import { login, createAdmin } from '../controllers/auth.controller';
import { authenticate, isAdmin, isSuperAdmin } from '../middlewares/auth.middleware';

const router = express.Router();

// Rota de login
router.post('/login', async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Rota para criar administrador (protegida, apenas super admin pode criar)
router.use('/admin', authenticate as express.RequestHandler);
router.use('/admin', isSuperAdmin as express.RequestHandler);
router.post('/admin', async (req: Request, res: Response) => {
  try {
    await createAdmin(req, res);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Rota de teste para verificar autenticação
router.use('/me', authenticate as express.RequestHandler);
router.get('/me', async (req: Request, res: Response): Promise<void> => {
res.status(200).json({
    message: 'Autenticado com sucesso',
    user: req.user
  });
});

export default router;