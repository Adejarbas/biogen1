import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

// Middleware para verificar autenticação
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obter token do cabeçalho
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Token não fornecido',
        message: 'É necessário fornecer um token de autenticação' 
      });
    }

    // Verificar formato do token
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ 
        error: 'Erro no token',
        message: 'Token mal formatado' 
      });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ 
        error: 'Erro no token',
        message: 'Token mal formatado' 
      });
    }

    // Verificar token
    const decoded = authService.verifyToken(token);
    
    // Adicionar informações do usuário à requisição
(req as any).user = decoded;
    
    return next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token inválido',
      message: error instanceof Error ? error.message : 'Token validation failed'
    });
  }
};

// Middleware para verificar se é administrador
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Acesso negado',
      message: 'Apenas administradores podem acessar este recurso' 
    });
  }
  
  return next();
};

// Middleware para verificar se é super administrador
export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'admin' || !(req as any).user.isSuperAdmin) {
    return res.status(403).json({ 
      error: 'Acesso negado',
      message: 'Apenas super administradores podem acessar este recurso' 
    });
  }
  
  return next();
};