import{ pool } from'../config/db.js';

const createTaxPayment = async (tax) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO tax_payments (type, amount, date, status) VALUES (?, ?, ?, ?)',
      [tax.type, tax.amount, tax.date, tax.status]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};

const getTaxPayments = async () => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM tax_payments');
    return results;
  } finally {
    connection.release();
  }
};

const updateTaxPaymentStatus = async (id, status) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('UPDATE tax_payments SET status = ? WHERE id = ?', [status, id]);
  } finally {
    connection.release();
  }
};

const deleteTaxPayment = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('DELETE FROM tax_payments WHERE id = ?', [id]);
  } finally {
    connection.release();
  }
};

export { createTaxPayment, getTaxPayments, updateTaxPaymentStatus, deleteTaxPayment };