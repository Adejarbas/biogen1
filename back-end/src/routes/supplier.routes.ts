import express from "express";
import { Request, Response } from "express";
import { ISuppliersList } from "../../ISupplier";
import {
  getSuppliers,
  getSupplierById,
  newSupplier,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplier.controller";

const router = express.Router();

//Listar fornecedores

router.get("/", getSuppliers);

// GET pelo id
router.get("/:id", getSupplierById);

/*router.get("/", (req: Request, res: Response) => {
  const supplierFilters = req.query as unknown as ISuppliersList;
  const suppliers = listSuppliers(supplierFilters);
  
  res.status(200).json(suppliers);
});*/

//Adicionar novo fornecedor

/*router.post("/suppliers", (req: Request, res: Response) => {
  const supplier = req.body; // O novo fornecedor deve vir do corpo da requisição
  const addSupplier = newSupplier(supplier);
  
  res.status(201).json(addSupplier); // Retorna o novo fornecedor adicionado
});*/

// POST /suppliers
router.post("/", newSupplier);

//Atualizar fornecedor

/*router.put("/suppliers/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const supplier = req.body;

  const updatedSupplier = updateSupplier(supplier);

  res.status(200).json(updatedSupplier);
});*/

// PUT /suppliers/:id
router.put("/:id", updateSupplier);

// Excluir fornecedor

// DELETE /suppliers/:id
router.delete("/:id", deleteSupplier);

/*router.delete("/suppliers/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const supplier = req.body
  
  const deletedSupplier = deleteSupplier(supplier);

  res.status(200).json(deletedSupplier);
});*/

export default router;