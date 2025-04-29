// invoiceService.js
import{ createInvoice, getInvoices, updateInvoiceStatus, deleteInvoice } from'../models/invoiceModel';

const getAllInvoices = async () => {
  return await getInvoices();
};

const addInvoice = async (invoice) => {
  return await createInvoice(invoice);
};

const updateInvoice = async (id, status) => {
  return await updateInvoiceStatus(id, status);
};

const removeInvoice = async (id) => {
  return await deleteInvoice(id);
};

module.exports = { getAllInvoices, addInvoice, updateInvoice, removeInvoice };