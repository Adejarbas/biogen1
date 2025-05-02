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


// Função para criar o primeiro admin do sistema
export const createFirstAdmin = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        error: 'Dados incompletos',
        message: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Verificar se já existe algum admin no sistema
    const adminExists = await authService.checkIfAdminExists();
    if (adminExists !== null && adminExists !== undefined) {
      return res.status(400).json({ 
        error: 'Operação não permitida',
        message: 'Já existe um administrador cadastrado no sistema' 
      });
    }

    // Criar o primeiro admin (sempre será superAdmin)
    const admin = await authService.createFirstAdmin(nome, email, senha);
    
    return res.status(201).json({
      message: 'Primeiro administrador criado com sucesso',
      admin: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
        isSuperAdmin: true
      }
    });
  } catch (error) {
    console.error('Erro ao criar primeiro administrador:', error);
    return res.status(500).json({ 
      error: 'Falha ao criar primeiro administrador',
      message: error instanceof Error ? error.message : 'Erro inesperado'
    });
  }
};