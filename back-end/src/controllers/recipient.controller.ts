import { IRecipientsList } from "../../IRecipient";
import { Request, Response } from "express";

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
export const getRecipients = (req: Request, res: Response) => {
  res.json(recipients);
};

// Buscar beneficiário por ID
export const getRecipientById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const recipient = recipients.find(r => r.id === id);

  if (!recipient) {
    return res.status(404).json({ message: "Beneficiário não encontrado" });
  }

  res.json(recipient);
};

// Adicionar novo beneficiário
export const newRecipient = (req: Request, res: Response) => {
  const newId = recipients.length > 0 ? Math.max(...recipients.map(r => Number(r.id))) + 1 : 1;
  const newRecipient = { id: newId, ...req.body };
  recipients.push(newRecipient);
  res.status(201).json(newRecipient);
};

// Atualizar beneficiário
export const updateRecipient = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = recipients.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Beneficiário não encontrado" });
  }

  recipients[index] = { ...recipients[index], ...req.body, id };
  res.json(recipients[index]);
};

// Excluir beneficiário
export const deleteRecipient = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = recipients.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Beneficiário não encontrado" });
  }

  const deleted = recipients.splice(index, 1);
  res.json({ message: "Beneficiário removido com sucesso", recipient: deleted[0] });
};