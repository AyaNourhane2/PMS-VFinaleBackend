import{ pool } from'../config/db.js';

const createInvoice = async (invoice) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO invoices (client, amount, date, status) VALUES (?, ?, ?, ?)',
      [invoice.client, invoice.amount, invoice.date, invoice.status]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};

const getInvoices = async () => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query('SELECT * FROM invoices');
    return results;
  } finally {
    connection.release();
  }
};

const updateInvoiceStatus = async (id, status) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('UPDATE invoices SET status = ? WHERE id = ?', [status, id]);
  } finally {
    connection.release();
  }
};

const deleteInvoice = async (id) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('DELETE FROM invoices WHERE id = ?', [id]);
  } finally {
    connection.release();
  }
};

export { createInvoice, getInvoices, updateInvoiceStatus, deleteInvoice };