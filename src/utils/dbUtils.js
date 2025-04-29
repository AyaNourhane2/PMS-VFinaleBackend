import { pool } from '../config/db.js';

// Définitions complètes des tables
const tableDefinitions = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      mobile VARCHAR(20),
      user_type ENUM('super_admin','admin','manager','staff','guest') NOT NULL DEFAULT 'guest',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      last_login DATETIME,
      failed_login_attempts INT DEFAULT 0,
      password_reset_token VARCHAR(255),
      password_reset_expires DATETIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_user_type (user_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  rooms: `
    CREATE TABLE IF NOT EXISTS rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_number VARCHAR(10) NOT NULL UNIQUE,
      room_type VARCHAR(50) NOT NULL,
      status ENUM('available','occupied','maintenance','reserved') NOT NULL DEFAULT 'available',
      price_per_night DECIMAL(10,2) NOT NULL,
      capacity INT NOT NULL,
      amenities TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_room_type (room_type),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  housekeeping_tasks: `
    CREATE TABLE IF NOT EXISTS housekeeping_tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_id INT NOT NULL,
      status ENUM('clean','dirty','in_progress','inspected') NOT NULL DEFAULT 'clean',
      staff_id INT,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms(id),
      FOREIGN KEY (staff_id) REFERENCES users(id),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  special_requests: `
    CREATE TABLE IF NOT EXISTS special_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      room_id INT NOT NULL,
      request_type VARCHAR(50) NOT NULL,
      description TEXT,
      status ENUM('pending','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  staff: `
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      position VARCHAR(50) NOT NULL,
      department VARCHAR(50) NOT NULL,
      hire_date DATE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  payments: `
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_method VARCHAR(50) NOT NULL,
      transaction_id VARCHAR(100),
      status ENUM('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
      payment_date DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  invoices: `
    CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      issue_date DATE NOT NULL,
      due_date DATE NOT NULL,
      status ENUM('unpaid','paid','overdue') NOT NULL DEFAULT 'unpaid',
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  tax_payments: `
    CREATE TABLE IF NOT EXISTS tax_payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tax_type VARCHAR(50) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_date DATE NOT NULL,
      reference_number VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `,
  audit_logs: `
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      action VARCHAR(50) NOT NULL,
      table_name VARCHAR(50) NOT NULL,
      record_id INT,
      old_values JSON,
      new_values JSON,
      ip_address VARCHAR(45),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `
};

// Fonction pour créer une table
const createTable = async (tableName, query) => {
  const conn = await pool.getConnection();
  try {
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query(`DROP TABLE IF EXISTS ${tableName}`);
    await conn.query(query);
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log(`✅ Table ${tableName} créée`);
  } catch (error) {
    console.error(`❌ Erreur création table ${tableName}:`, error);
    throw error;
  } finally {
    conn.release();
  }
};

// Initialisation des données
const seedInitialData = async () => {
  const conn = await pool.getConnection();
  try {
    // Vérifier si l'admin existe
    const [rows] = await conn.query('SELECT id FROM users WHERE user_type = "super_admin" LIMIT 1');
    if (rows.length === 0) {
      const hashedPassword = '$2a$10$N9qo8uLOickgx2ZMRZoMy.MZHbjS2X6AJR6dRWRo7KTCCa7Pq3L8a'; // "Admin123!"
      await conn.query(
        `INSERT INTO users 
        (username, email, password, first_name, last_name, user_type) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        ['admin', 'admin@example.com', hashedPassword, 'System', 'Admin', 'super_admin']
      );
      console.log('👑 Compte admin créé');
    }
  } catch (error) {
    console.error('Erreur initialisation données:', error);
    throw error;
  } finally {
    conn.release();
  }
};

// Initialisation complète de la DB
export const initializeDatabase = async () => {
  try {
    console.log('🚀 Début initialisation DB...');
    
    // Création des tables dans l'ordre
    await createTable('users', tableDefinitions.users);
    await createTable('rooms', tableDefinitions.rooms);
    await createTable('housekeeping_tasks', tableDefinitions.housekeeping_tasks);
    await createTable('special_requests', tableDefinitions.special_requests);
    await createTable('staff', tableDefinitions.staff);
    await createTable('payments', tableDefinitions.payments);
    await createTable('invoices', tableDefinitions.invoices);
    await createTable('tax_payments', tableDefinitions.tax_payments);
    await createTable('audit_logs', tableDefinitions.audit_logs);

    // Peuplement initial
    await seedInitialData();
    
    console.log('🎉 Base de données initialisée!');
    return true;
  } catch (error) {
    console.error('💥 Erreur initialisation DB:', error);
    throw error;
  }
};

// Vérification connexion DB
export const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Erreur connexion DB:', error);
    return false;
  }
};

export default {
  initializeDatabase,
  checkDatabaseConnection
};