import express, { Request, Response, NextFunction } from 'express';
import { authenticate, isAdmin, isSuperAdmin } from '../middlewares/auth.middleware';

import { 
  login, 
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin 
} from '../controllers/auth.controller';

const router = express.Router();

/*// Rota para criar o primeiro admin (sem autenticação)
router.post('/first-admin', async (req: Request, res: Response) => {
  try {
    await createFirstAdmin(req, res);
  } catch (error: any) {
    res.status(500).json({ 
      error: 'Erro ao criar primeiro admin', 
      message: error.message 
    });
  }
});

// Rota de login
router.post('/login', async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error: any) {
    res.status(401).json({ 
      error: 'Falha na autenticação', 
      message: error.message 
    });
  }
});

// Rotas protegidas (precisam de autenticação)
router.use('/admin', authenticate as express.RequestHandler);
router.use('/admin', isSuperAdmin as express.RequestHandler);

// Rota para criar outros admins (apenas super admin)
router.post('/admin', async (req: Request, res: Response) => {
  try {
    await createAdmin(req, res);
  } catch (error: any) {
    res.status(403).json({ 
      error: 'Erro ao criar admin', 
      message: error.message 
    });
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
*/


// Rota para criar admin (sem verificação)
router.post('/admin', createAdmin);

// Rota de login
router.post('/login', login);

// Rotas para gerenciar admins (sem autorização)
router.get('/admin', getAllAdmins);
router.get('/admin/:id', getAdminById);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

export default router;