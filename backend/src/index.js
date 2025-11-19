import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import quizRoutes from './routes/quizzes.js';
import llmRoutes from './routes/llm.js';
import User from './models/User.js';
import Badge from './models/Badge.js';
import { authenticateToken } from './middleware/auth.js';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'API Plateforme d\'Apprentissage avec LLM',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      quizzes: '/api/quizzes',
      llm: '/api/llm',
      badges: '/api/badges'
    }
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/llm', llmRoutes);

// Route pour les badges
app.get('/api/badges', (req, res) => {
  try {
    const badges = Badge.getAll();
    res.json(badges);
  } catch (error) {
    console.error('Erreur lors de la récupération des badges:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour les badges d'un utilisateur
app.get('/api/users/:userId/badges', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifier que l'utilisateur demande ses propres badges
    if (parseInt(userId) !== req.user.id) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const badges = User.getBadges(userId);
    res.json(badges);
  } catch (error) {
    console.error('Erreur lors de la récupération des badges:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    error: 'Erreur serveur interne',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║     🚀  Serveur de la Plateforme d\'Apprentissage  🚀       ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📡 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📚 Endpoints disponibles:');
  console.log('   - GET  /api/auth/profile');
  console.log('   - POST /api/auth/register');
  console.log('   - POST /api/auth/login');
  console.log('   - GET  /api/courses');
  console.log('   - GET  /api/quizzes/:id');
  console.log('   - POST /api/llm/explain');
  console.log('   - POST /api/llm/debug');
  console.log('   - POST /api/llm/generate-quiz');
  console.log('');
  console.log('💡 Astuce: Assurez-vous qu\'Ollama est lancé sur ' + (process.env.OLLAMA_URL || 'http://localhost:11434'));
  console.log('');
});

export default app;
