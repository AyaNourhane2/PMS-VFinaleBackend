import { pool } from '../config/db.js';

const getInventoryOrders = async () => {
  const [orders] = await pool.query('SELECT * FROM inventory_orders');
  return orders;
};

const addInventoryOrder = async (order) => {
  const [result] = await pool.query('INSERT INTO inventory_orders (product, quantity, date) VALUES (?, ?, ?)', [order.product, order.quantity, order.date]);
  return result.insertId;
};

export { getInventoryOrders, addInventoryOrder };