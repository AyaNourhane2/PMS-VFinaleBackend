// paymentService.js
import{ createPayment, getPayments, deletePayment } from'../models/paymentModel';

const getAllPayments = async () => {
  return await getPayments();
};

const addPayment = async (payment) => {
  return await createPayment(payment);
};

const removePayment = async (id) => {
  return await deletePayment(id);
};

module.exports = { getAllPayments, addPayment, removePayment };