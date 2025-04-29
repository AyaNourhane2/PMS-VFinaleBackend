import { pool } from '../config/db.js';
const getTasks = async () => {
  const [tasks] = await pool.query('SELECT * FROM housekeeping_tasks');
  return tasks;
};

const addTask = async (task) => {
  const [result] = await pool.query('INSERT INTO housekeeping_tasks (room, status) VALUES (?, ?)', [task.room, task.status]);
  return result.insertId;
};

const updateTaskStatus = async (taskId, status) => {
  await pool.query('UPDATE housekeeping_tasks SET status = ? WHERE id = ?', [status, taskId]);
};

export { getTasks, addTask, updateTaskStatus };