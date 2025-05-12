import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { Supplier } from "../models/Supplier.model";
import { Recipient } from "../models/recipient.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const authService = new AuthService();



/// Criar admin
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, senha } = req.body;
        
        const admin = await User.create({
            nome,
            email,
            senha,
            userType: 'admin'
        });

        res.status(201).json({
            message: 'Administrador criado com sucesso',
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                userType: admin.userType
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar administrador' });
    }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne({ where: { email, senha } });
        
        if (!user) {
            res.status(401).json({ message: 'Email ou senha inválidos' });
            return;
        }

        res.json({ 
            message: 'Login realizado com sucesso',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                userType: user.userType
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login' });
    }
};

// Listar todos
export const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins = await User.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar administradores' });
    }
};

// Buscar por ID
export const getAdminById = async (req: Request, res: Response): Promise<void> => {
    try {
        const admin = await User.findByPk(req.params.id);
        
        if (!admin) {
            res.status(404).json({ message: 'Administrador não encontrado' });
            return;
        }
        
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar administrador' });
    }
};

// Atualizar Admin
export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        
        const admin = await User.findByPk(id);
        
        if (!admin) {
            res.status(404).json({ message: 'Administrador não encontrado' });
            return;
        }

        // Atualiza diretamente sem hash
        await admin.update({
            nome,
            email,
            senha
        });

        res.json({ 
            message: 'Administrador atualizado com sucesso',
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                userType: admin.userType,
                senha: admin.senha // Agora mostra a senha como foi digitada
            }
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao atualizar administrador' });
    }
};

// Deletar Admin
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const admin = await User.findByPk(id);
        
        if (!admin) {
            res.status(404).json({ message: 'Administrador não encontrado' });
            return;
        }

        await admin.destroy();
        res.json({ message: 'Administrador removido com sucesso' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao remover administrador' });
    }
};