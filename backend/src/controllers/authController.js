import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

class AuthController {
  /**
   * Inscription d'un nouvel utilisateur
   */
  static async register(req, res) {
    try {
      const { email, password, username } = req.body;

      // Validation
      if (!email || !password || !username) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const user = User.create(email, hashedPassword, username);

      // Générer le token
      const token = generateToken(user);

      res.status(201).json({
        message: 'Compte créé avec succès',
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        },
        token
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' });
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
      }

      // Trouver l'utilisateur
      const user = User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      // Générer le token
      const token = generateToken(user);

      res.json({
        message: 'Connexion réussie',
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        },
        token
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
    }
  }

  /**
   * Obtenir le profil de l'utilisateur connecté
   */
  static async getProfile(req, res) {
    try {
      const user = User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Ne pas retourner le mot de passe
      const { password, ...userWithoutPassword } = user;

      // Obtenir les statistiques
      const stats = User.getStats(user.id);
      const badges = User.getBadges(user.id);
      const progress = User.getProgress(user.id);

      res.json({
        user: userWithoutPassword,
        stats,
        badges,
        progress
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Mettre à jour le profil
   */
  static async updateProfile(req, res) {
    try {
      const { username, email, currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      const updateData = {};

      // Mise à jour du nom d'utilisateur
      if (username) {
        updateData.username = username;
      }

      // Mise à jour de l'email
      if (email) {
        const existingUser = User.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }
        updateData.email = email;
      }

      // Mise à jour du mot de passe
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Le mot de passe actuel est requis' });
        }

        const user = User.findById(userId);
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
          return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
        }

        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      // Mettre à jour l'utilisateur
      const updatedUser = User.update(userId, updateData);
      const { password, ...userWithoutPassword } = updatedUser;

      res.json({
        message: 'Profil mis à jour avec succès',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default AuthController;
