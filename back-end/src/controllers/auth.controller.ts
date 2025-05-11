import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const authService = new AuthService();



// Criar admin
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
      const { nome, email, senha } = req.body;
      
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(senha, 10);
      
      // Cria o admin
      const admin = await User.create({
          nome,
          email,
          senha: hashedPassword,
          userType: 'admin'
      });

      res.status(201).json({
          message: 'Administrador criado com sucesso',
          admin: {
              id: admin.id,
              nome: admin.nome,
              email: admin.email
          }
      });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao criar administrador' });
  }
};

// Login simples
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, senha } = req.body;
      
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
          res.status(401).json({ error: 'Usuário não encontrado' });
          return;
      }

      const senhaValida = await bcrypt.compare(senha, user.senha);
      
      if (!senhaValida) {
          res.status(401).json({ error: 'Senha inválida' });
          return;
      }

      const token = jwt.sign(
          { id: user.id, email: user.email },
          'chave-secreta',
          { expiresIn: '1h' }
      );

      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: 'Erro no login' });
  }
};

// Listar todos
export const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
      const admins = await User.findAll({
          attributes: { exclude: ['senha'] }
      });
      res.json(admins);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao listar administradores' });
  }
};

// Buscar por ID
export const getAdminById = async (req: Request, res: Response): Promise<void> => {
  try {
      const admin = await User.findByPk(req.params.id, {
          attributes: { exclude: ['senha'] }
      });
      
      if (!admin) {
          res.status(404).json({ error: 'Administrador não encontrado' });
          return;
      }
      
      res.json(admin);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar administrador' });
  }
};

// Atualizar
export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
      const { nome, email } = req.body;
      const admin = await User.findByPk(req.params.id);
      
      if (!admin) {
          res.status(404).json({ error: 'Administrador não encontrado' });
          return;
      }

      await admin.update({ nome, email });
      res.json({ message: 'Administrador atualizado com sucesso' });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar administrador' });
  }
};

// Deletar
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
      const admin = await User.findByPk(req.params.id);
      
      if (!admin) {
          res.status(404).json({ error: 'Administrador não encontrado' });
          return;
      }

      await admin.destroy();
      res.json({ message: 'Administrador removido com sucesso' });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao remover administrador' });
  }
};