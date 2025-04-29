import { registerUser, loginUser } from '../services/authService.js';

export async function register(req, res) {
  try {
    const { username, email, mobile, password, role } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
    }

    const result = await registerUser({ username, email, mobile, password, role });
    
    res.status(201).json({ 
      success: true, 
      message: "Inscription réussie", 
      data: result 
    });
  } catch (error) {
    console.error('Erreur register:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || "Erreur lors de l'inscription" 
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email et mot de passe requis" });
    }

    const result = await loginUser({ email, password, role });
    
    res.json({ 
      success: true, 
      message: "Connexion réussie", 
      token: result.token,
      user: result.user,
      role: result.user.role // Ajout du rôle dans la réponse
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(401).json({ 
      success: false, 
      message: error.message || "Échec de la connexion" 
    });
  }
}