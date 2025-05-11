import { ISuppliersList } from "../../ISupplier";
import { Request, Response } from "express";
import { Supplier } from "../models/Supplier.model";

// Nova função para uso com Express
export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar fornecedores" });
    }
}

// Função para id
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            res.status(404).json({ message: "Fornecedor não encontrado" });
            return;
        }

        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar fornecedor" });
    }
};




// Post
export const newSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: "Erro ao criar fornecedor" });
    }
};


//PUT
// PUT - Atualizar
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            res.status(404).json({ message: "Fornecedor não encontrado" });
            return;
        }

        await supplier.update(req.body);
        res.status(200).json(supplier);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: "Erro ao atualizar fornecedor" });
    }
};


//DELETE
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            res.status(404).json({ message: "Fornecedor não encontrado" });
            return;
        }

        await supplier.destroy();
        res.json({ message: "Fornecedor removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover fornecedor" });
    }
};



