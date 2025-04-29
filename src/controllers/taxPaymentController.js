import { createTaxPayment, getTaxPayments, updateTaxPaymentStatus, deleteTaxPayment } from '../models/taxPaymentModel.js';

export const getAllTaxPayments = async (req, res) => {
  try {
    const taxPayments = await getTaxPayments();
    res.json(taxPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTaxPayment = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const taxPayment = { type, amount, date: new Date().toISOString().split('T')[0], status: 'en attente' };
    const id = await createTaxPayment(taxPayment);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaxPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await updateTaxPaymentStatus(id, status);
    res.json({ message: 'Tax payment updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeTaxPayment = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTaxPayment(id);
    res.json({ message: 'Tax payment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};