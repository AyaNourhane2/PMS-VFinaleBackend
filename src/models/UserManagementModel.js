import { pool } from '../config/db.js';

class UserManagementModel {
  static async getAllUsers() {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        username, 
        email,
        user_type as role 
      FROM user_management
    `);
    return rows;
  }

  static async addUser(username, email, role) {
    const [result] = await pool.query(
      'INSERT INTO user_management (username, email, user_type) VALUES (?, ?, ?)',
      [username, email, role]
    );
    return { id: result.insertId, username, email, role };
  }

  static async updateUser(id, username, email, role) {
    await pool.query(
      'UPDATE user_management SET username = ?, email = ?, user_type = ? WHERE id = ?',
      [username, email, role, id]
    );
    return { id, username, email, role };
  }

  static async deleteUser(id) {
    await pool.query('DELETE FROM user_management WHERE id = ?', [id]);
    return { id };
  }
}

export default UserManagementModel;