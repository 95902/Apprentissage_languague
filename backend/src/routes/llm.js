import express from 'express';
import LLMController from '../controllers/llmController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes LLM nécessitent une authentification
router.use(authenticateToken);

// Vérification de santé
router.get('/health', LLMController.checkHealth);

// Fonctionnalités du LLM
router.post('/explain', LLMController.explainConcept);
router.post('/debug', LLMController.debugCode);
router.post('/generate-exercise', LLMController.generateExercise);
router.post('/generate-quiz', LLMController.generateQuiz);
router.post('/suggest-code', LLMController.suggestCode);
router.post('/improve-code', LLMController.improveCode);
router.post('/explain-code', LLMController.explainCode);

export default router;
