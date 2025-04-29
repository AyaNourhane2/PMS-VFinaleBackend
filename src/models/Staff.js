import { pool } from '../config/db.js';

const getStaff = async () => {
  const [staff] = await pool.query('SELECT * FROM staff');
  return staff;
};

const addStaff = async (employee) => {
  const [result] = await pool.query('INSERT INTO staff (name, status, performance) VALUES (?, ?, ?)', [employee.name, employee.status, employee.performance]);
  return result.insertId;
};

export { getStaff, addStaff };