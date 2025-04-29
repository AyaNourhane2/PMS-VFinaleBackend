import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète_secure";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

export async function registerUser(userData) {
  const { email, password } = userData;
  
  // Validation des données
  if (!email || !password) {
    throw new Error("Email et mot de passe sont requis");
  }

  // Vérification de l'existence de l'utilisateur
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Un utilisateur avec cet email existe déjà");
  }

  // Hashage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Création de l'utilisateur
  const user = await createUser({
    ...userData,
    password: hashedPassword,
    role: userData.role || 'user'
  });

  return user;
}

export async function loginUser({ email, password, role }) {
  // Validation des données
  if (!email || !password) {
    throw new Error("Email et mot de passe sont requis");
  }

  // Recherche de l'utilisateur
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Identifiants invalides");
  }

  // Vérification du mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Identifiants invalides");
  }

  // Vérification du rôle si spécifié
  if (role && user.user_type.toLowerCase() !== role.toLowerCase()) {
    throw new Error("Accès non autorisé pour ce rôle");
  }

  // Génération du token JWT
  const token = jwt.sign(
    { 
      id: user.id, 
      role: user.user_type,
      email: user.email
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.user_type,
      mobile: user.mobile
    }
  };
}