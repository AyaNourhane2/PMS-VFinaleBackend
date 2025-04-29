import { createInvoice, getInvoices, updateInvoiceStatus, deleteInvoice } from '../models/invoiceModel.js';

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await getInvoices();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addInvoice = async (req, res) => {
  try {
    const { client, amount } = req.body;
    const invoice = { client, amount, date: new Date().toISOString().split('T')[0], status: 'en attente' };
    const id = await createInvoice(invoice);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateInvoiceStatus(id, status);
    res.json({ message: 'Invoice updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteInvoice(id);
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};