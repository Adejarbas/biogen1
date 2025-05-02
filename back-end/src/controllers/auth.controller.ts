import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha, userType } = req.body;

    // Validar campos obrigatórios
    if (!email || !senha || !userType) {
      return res.status(400).json({ 
        error: 'Dados incompletos',
        message: 'Email, senha e tipo de usuário são obrigatórios' 
      });
    }

    // Validar tipo de usuário
    if (!['admin', 'supplier', 'recipient'].includes(userType)) {
      return res.status(400).json({ 
        error: 'Tipo de usuário inválido',
        message: 'O tipo de usuário deve ser admin, supplier ou recipient' 
      });
    }

    // Realizar login
    const result = await authService.login(email, senha, userType);
    
    return res.status(200).json({
      message: 'Login realizado com sucesso',
      ...result
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(401).json({ 
      error: 'Falha na autenticação',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};

// Função para criar um administrador (apenas para exemplo)
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, isSuperAdmin } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        error: 'Dados incompletos',
        message: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Hash da senha
    const hashedPassword = await authService.hashPassword(senha);

    // Aqui você salvaria no banco de dados
    // Exemplo: const admin = await Admin.create({ nome, email, senha: hashedPassword, isSuperAdmin });

    return res.status(201).json({
      message: 'Administrador criado com sucesso',
      admin: { nome, email, isSuperAdmin }
    });
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
    return res.status(500).json({ 
      error: 'Falha ao criar administrador',
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
};