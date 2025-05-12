import express from "express";
import { Request, Response } from "express";
import { IRecipientsList } from "../../IRecipient";
//  import { listRecipients, newRecipient, updateRecipient, deleteRecipient } from "../controllers/recipient.controller";
import {
  getRecipients,
  getRecipientById,
  newRecipient,
  updateRecipient,
  deleteRecipient
} from "../controllers/recipient.controller";

const router = express.Router();


// Listar beneficiários
router.get("/", getRecipients);

// GET pelo id
router.get("/:id", getRecipientById);

// Adicionar novo beneficiário
router.post("/", newRecipient);

// Atualizar beneficiário
router.put("/:id", updateRecipient);

// Excluir beneficiário
router.delete("/:id", deleteRecipient);

export default router;