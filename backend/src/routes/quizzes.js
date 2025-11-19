import express from 'express';
import QuizController from '../controllers/quizController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques (lecture)
router.get('/:id', QuizController.getQuizById);

// Routes protégées
router.post('/:id/submit', authenticateToken, QuizController.submitQuiz);
router.get('/:id/attempts', authenticateToken, QuizController.getQuizAttempts);

// Routes admin
router.post('/', QuizController.createQuiz);

export default router;
