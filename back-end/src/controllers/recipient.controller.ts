import { Request, Response } from "express";
import { IRecipientsList } from "../../IRecipient";


const recipients = [
  {
    id: 1,
    nis: "123124141",
    email:"beneficiario@gmail.com"
  }
];


export const listRecipients = (recipientFilters: IRecipientsList) => {
  const { id, nis } = recipientFilters;

  const filteredRecipients = recipients.filter((recipient) => {
    let foundRecipient = true;

    if (nis && !recipient.nis.includes(nis)) {
      foundRecipient = false;
    }

    if (id && recipient.id !== Number(id)) {
      foundRecipient = false;
    }

    return foundRecipient;
  });

  return filteredRecipients;
};


/*
export const newRecipient = (recipient: IRecipientsList) => {
  const newId = recipients.length > 0 ? Math.max(...recipients.map(r => Number(r.id))) + 1 : 1;
  const newRecipient = { ...recipient, id: newId };
  recipients.push(newRecipient);
  return newRecipient;
};

export const updateRecipient = (recipient: IRecipientsList) => {
  const index = recipients.findIndex((r) => r.id === recipient.id);
  if (index === -1) {
    return null;
  }
  recipients[index] = { ...recipients[index], ...recipient, id: Number(recipient.id) };
  return recipients[index];
};

export const deleteRecipient = (recipient: IRecipientsList) => {
  const index = recipients.findIndex((r) => r.id === recipient.id);
  if (index === -1) {
    return false;
  }
  recipients.splice(index, 1);
  return true;
};
*/


//NOVO 
// Listar todos os beneficiários
export const getRecipients = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json(recipients);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar beneficiários" });
  }
};

// Buscar beneficiário por ID
export const getRecipientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const recipient = recipients.find(r => r.id === id);

    if (!recipient) {
      res.status(404).json({ message: "Beneficiário não encontrado" });
      return;
    }

    res.status(200).json(recipient);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar beneficiário" });
  }
};

// Adicionar novo beneficiário
export const newRecipient = async (req: Request, res: Response): Promise<void> => {
  try {
    const newId = recipients.length > 0 ? Math.max(...recipients.map(r => Number(r.id))) + 1 : 1;
    const newRecipient = { id: newId, ...req.body };
    recipients.push(newRecipient);
    res.status(201).json(newRecipient);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar beneficiário" });
  }
};

// Atualizar beneficiário
export const updateRecipient = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const index = recipients.findIndex(r => r.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Beneficiário não encontrado" });
      return;
    }

    recipients[index] = { ...recipients[index], ...req.body, id };
    res.status(200).json(recipients[index]);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar beneficiário" });
  }
};

// Excluir beneficiário
export const deleteRecipient = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const index = recipients.findIndex(r => r.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Beneficiário não encontrado" });
      return;
    }

    const deleted = recipients.splice(index, 1);
    res.status(200).json({ message: "Beneficiário removido com sucesso", recipient: deleted[0] });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir beneficiário" });
  }
};