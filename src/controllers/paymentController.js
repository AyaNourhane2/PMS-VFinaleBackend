import { createPayment, getPayments, deletePayment } from '../models/paymentModel.js';

export const getAllPayments = async (req, res) => {
  try {
    const payments = await getPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addPayment = async (req, res) => {
  try {
    const { client, amount, paymentMethod } = req.body;
    const payment = { client, amount, paymentMethod, date: new Date().toISOString().split('T')[0] };
    const id = await createPayment(payment);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePayment(id);
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};