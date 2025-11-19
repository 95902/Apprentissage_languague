import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Badge from '../models/Badge.js';

class CourseController {
  /**
   * Obtenir tous les cours
   */
  static getAllCourses(req, res) {
    try {
      const courses = Course.getAll();
      res.json(courses);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Obtenir un cours par ID
   */
  static getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = Course.findById(id);

      if (!course) {
        return res.status(404).json({ error: 'Cours non trouvé' });
      }

      // Récupérer les leçons avec progression si utilisateur connecté
      let lessons;
      if (req.user) {
        lessons = Course.getLessonsWithProgress(id, req.user.id);
      } else {
        lessons = Course.getLessons(id);
      }

      // Récupérer les quiz
      const quizzes = Course.getQuizzes(id);

      res.json({
        ...course,
        lessons,
        quizzes
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du cours:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Obtenir les cours par langage
   */
  static getCoursesByLanguage(req, res) {
    try {
      const { language } = req.params;
      const courses = Course.getByLanguage(language);
      res.json(courses);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Obtenir les cours par niveau
   */
  static getCoursesByLevel(req, res) {
    try {
      const { level } = req.params;
      const courses = Course.getByLevel(level);
      res.json(courses);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Marquer une leçon comme complétée
   */
  static completeLesson(req, res) {
    try {
      const { lessonId } = req.params;
      const userId = req.user.id;

      const lesson = Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: 'Leçon non trouvée' });
      }

      // Marquer comme complétée
      Lesson.markAsCompleted(lessonId, userId);

      // Vérifier et attribuer les badges
      const newBadges = Badge.checkAndAwardBadges(userId);

      res.json({
        message: 'Leçon complétée avec succès',
        newBadges: newBadges.length > 0 ? newBadges : null
      });
    } catch (error) {
      console.error('Erreur lors de la complétion de la leçon:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Obtenir une leçon par ID
   */
  static getLessonById(req, res) {
    try {
      const { id } = req.params;
      const lesson = Lesson.findById(id);

      if (!lesson) {
        return res.status(404).json({ error: 'Leçon non trouvée' });
      }

      // Vérifier si complétée (si utilisateur connecté)
      let isCompleted = false;
      if (req.user) {
        isCompleted = Lesson.isCompleted(id, req.user.id);
      }

      res.json({
        ...lesson,
        is_completed: isCompleted
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la leçon:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Créer un nouveau cours (admin)
   */
  static createCourse(req, res) {
    try {
      const course = Course.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Créer une nouvelle leçon (admin)
   */
  static createLesson(req, res) {
    try {
      const lesson = Lesson.create(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      console.error('Erreur lors de la création de la leçon:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default CourseController;
