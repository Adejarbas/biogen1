import express, { Router } from "express";
import {
  getSuppliers,
  getSupplierById,
  newSupplier,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplier.controller";

const router: Router = express.Router();

// Rotas de fornecedores
router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", newSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;