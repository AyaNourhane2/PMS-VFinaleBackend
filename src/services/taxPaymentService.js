// taxPaymentService.js
import{ createTaxPayment, getTaxPayments, updateTaxPaymentStatus, deleteTaxPayment } from'../models/taxPaymentModel';

const getAllTaxPayments = async () => {
  return await getTaxPayments();
};

const addTaxPayment = async (taxPayment) => {
  return await createTaxPayment(taxPayment);
};

const updateTaxPayment = async (id, status) => {
  return await updateTaxPaymentStatus(id, status);
};

const removeTaxPayment = async (id) => {
  return await deleteTaxPayment(id);
};

module.exports = { getAllTaxPayments, addTaxPayment, updateTaxPayment, removeTaxPayment };