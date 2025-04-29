import { pool } from '../config/db.js';

const getSpecialRequests = async () => {
  const [requests] = await pool.query('SELECT * FROM special_requests');
  return requests;
};

const addSpecialRequest = async (request) => {
  const [result] = await pool.query('INSERT INTO special_requests (room, request) VALUES (?, ?)', [request.room, request.request]);
  return result.insertId;
};

export { getSpecialRequests, addSpecialRequest };