import{ pool } from'../config/db.js';

const createPayment = async (payment) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO payments (client, amount, date, payment_method) VALUES (?, ?, ?, ?)',
      [payment.client, payment.amount, payment.date, payment.paymentMethod]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};

const getPayments = async () => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM payments');
    return results;
  } finally {
    connection.release();
  }
};

const deletePayment = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('DELETE FROM payments WHERE id = ?', [id]);
  } finally {
    connection.release();
  }
};

export {createPayment, getPayments, deletePayment };