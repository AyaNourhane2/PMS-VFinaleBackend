import { pool } from '../config/db.js';

export async function findUserByEmail(email) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? LIMIT 1', 
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erreur lors de la recherche utilisateur:', error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    const [result] = await pool.query(
      `INSERT INTO users 
      (username, email, password, mobile, user_type) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        userData.username,
        userData.email,
        userData.password,
        userData.mobile,
        userData.role || 'user' // Valeur par défaut
      ]
    );
    
    // Récupérer l'utilisateur créé
    const [user] = await pool.query(
      'SELECT * FROM users WHERE id = ?', 
      [result.insertId]
    );
    
    return user[0];
  } catch (error) {
    console.error('Erreur lors de la création utilisateur:', error);
    throw error;
  }
}