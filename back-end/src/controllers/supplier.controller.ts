import { ISuppliersList } from "../../ISupplier";
import { Request, Response } from "express";


const suppliers = [
  {
    id: 1,
    cnpj: "123123",
    razaoSocial: "Alessandro",
    cep: "0",
    address: "0",
    number: "0",
    email: "0",
    password: "asdadsa"
  }
];


export const listSuppliers = (supplierFilters : ISuppliersList) => {

  const { id, cnpj, razaoSocial } = supplierFilters;

  const filteredsuppliers = suppliers.filter((supplier) => {
    let foundSuppliers = true;

    if (razaoSocial && !supplier.razaoSocial.toLowerCase().includes(razaoSocial.toLowerCase())) {
      foundSuppliers = false;
    }

    if (cnpj && !supplier.cnpj.toLowerCase().includes(razaoSocial.toLowerCase())) {
      foundSuppliers = false;
    }

    if (id && supplier.id !== Number(id)) {
      foundSuppliers = false;
    }

    return foundSuppliers;
  });

}

// Nova função para uso com Express
export const getSuppliers = (req: Request, res: Response) => {
  // Aqui você pode adicionar filtros usando req.query se desejar
  res.json(suppliers);
}

// Função para id
export const getSupplierById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const supplier = suppliers.find(s => s.id === id);

  if (!supplier) {
    res.status(404).json({ message: "Fornecedor não encontrado" });
  }

  res.json(supplier);
}


// export const newSupplier = (supplierFilters : ISuppliersList) => {

// Post
export const newSupplier = (req: Request, res: Response) => {
    const newId = suppliers.length > 0 ? suppliers[suppliers.length - 1].id + 1 : 1;
    const newSupplier = { id: newId, ...req.body };
    suppliers.push(newSupplier);
    res.status(201).json(newSupplier);
  }


//PUT
export const updateSupplier = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = suppliers.findIndex(s => s.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Fornecedor não encontrado" });
  }

  suppliers[index] = { ...suppliers[index], ...req.body, id };
  res.json(suppliers[index]);
}

// export const updateSupplier = (supplierFilters : ISuppliersList) => {

  /**const index = products.findIndex((p) => p.id === Number(id));
    if (index === -1){

      res.status(404).send();

      return
    } 
    products[index] = { ...products[index], ...productAtualizado };
    res.status(200).json(products[index]);**/


//DELETE
export const deleteSupplier = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = suppliers.findIndex(s => s.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Fornecedor não encontrado" });
  }

  const deleted = suppliers.splice(index, 1);
  res.json({ message: "Fornecedor removido com sucesso", supplier: deleted[0] });
}

//export const deleteSupplier = (supplierFilters : ISuppliersList) => {

  /**const index = suppliers.findIndex((e) => e.id === Number(id));
  if (index === -1) res.status(404).send();
  suppliers.splice(index, 1);
  
  res.status(204).send();
  return;**/



