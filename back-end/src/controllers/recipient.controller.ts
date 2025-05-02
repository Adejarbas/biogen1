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

