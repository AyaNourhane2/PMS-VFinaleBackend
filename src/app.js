import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import { initializeDatabase, checkDatabaseConnection } from './utils/dbUtils.js';

// Import des routes
import authRoutes from './routes/authRoutes.js';
import housekeepingTaskRoutes from './routes/housekeepingTaskRoutes.js';
import inventoryOrderRoutes from './routes/inventoryOrderRoutes.js';
import specialRequestRoutes from './routes/specialRequestRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import userRoutes from './routes/userRoutes.js';
import usersManagRoutes from './routes/usersmanagroute.js';
import paymentRoutes from './routes/paymentRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import taxPaymentRoutes from './routes/taxPaymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware amélioré
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Vérification de la connexion à la base de données
checkDatabaseConnection()
  .then(() => console.log('✅ Connexion à la base de données établie'))
  .catch(err => console.error('❌ Erreur de connexion à la base:', err));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/housekeeping', housekeepingTaskRoutes);
app.use('/api/inventory', inventoryOrderRoutes);
app.use('/api/requests', specialRequestRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/users', userRoutes);
app.use('/api/management', usersManagRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/tax_payments', taxPaymentRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API opérationnelle',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur:', err.stack);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

// Initialisation du serveur
const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('✅ Base de données initialisée avec succès');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('Rejet non géré:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Exception non capturée:', err);
  process.exit(1);
});

startServer();