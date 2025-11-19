import express from 'express';
import CourseController from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);
router.get('/language/:language', CourseController.getCoursesByLanguage);
router.get('/level/:level', CourseController.getCoursesByLevel);

// Routes pour les leçons (publiques pour la lecture)
router.get('/lessons/:id', CourseController.getLessonById);

// Routes protégées (nécessitent authentification)
router.post('/lessons/:lessonId/complete', authenticateToken, CourseController.completeLesson);

// Routes admin (à protéger davantage en production)
router.post('/', CourseController.createCourse);
router.post('/lessons', CourseController.createLesson);

export default router;
