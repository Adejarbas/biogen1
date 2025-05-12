import { Request, Response } from "express";
import { IRecipientsList } from "../../IRecipient";
import { Recipient } from "../models/recipient.model";

const recipients = [
  {
    id: 1,
    nis: "123124141",
    email:"beneficiario@gmail.com"
  }
];


//NOVO 
// Listar todos os beneficiários
export const getRecipients = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipients = await Recipient.findAll();
        res.json(recipients);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar beneficiários" });
    }
};

// Buscar beneficiário por ID
export const getRecipientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            res.status(404).json({ message: "Beneficiário não encontrado" });
            return;
        }

        res.json(recipient);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar beneficiário" });
    }
};

// Adicionar novo beneficiário
export const newRecipient = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipient = await Recipient.create(req.body);
        res.status(201).json(recipient);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: "Erro ao criar beneficiário" });
    }
};

// Atualizar beneficiário
export const updateRecipient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            res.status(404).json({ message: "Beneficiário não encontrado" });
            return;
        }

        await recipient.update(req.body);
        res.status(200).json(recipient);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: "Erro ao atualizar beneficiário" });
    }
};

// Excluir beneficiário
export const deleteRecipient = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            res.status(404).json({ message: "Beneficiário não encontrado" });
            return;
        }

        await recipient.destroy();
        res.json({ message: "Beneficiário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover beneficiário" });
    }
};