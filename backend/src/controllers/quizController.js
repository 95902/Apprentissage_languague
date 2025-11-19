import Quiz from '../models/Quiz.js';
import Badge from '../models/Badge.js';

class QuizController {
  /**
   * Obtenir un quiz par ID
   */
  static getQuizById(req, res) {
    try {
      const { id } = req.params;
      const quiz = Quiz.findById(id);

      if (!quiz) {
        return res.status(404).json({ error: 'Quiz non trouvé' });
      }

      // Récupérer les questions (sans les réponses correctes)
      const questions = Quiz.getQuestionsForQuiz(id);

      // Récupérer les tentatives de l'utilisateur si connecté
      let userAttempts = [];
      let bestAttempt = null;
      if (req.user) {
        userAttempts = Quiz.getUserAttempts(id, req.user.id);
        bestAttempt = Quiz.getBestAttempt(id, req.user.id);
      }

      res.json({
        ...quiz,
        questions,
        total_questions: questions.length,
        user_attempts: userAttempts,
        best_attempt: bestAttempt
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du quiz:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Soumettre une tentative de quiz
   */
  static submitQuiz(req, res) {
    try {
      const { id } = req.params;
      const { answers } = req.body;
      const userId = req.user.id;

      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Réponses invalides' });
      }

      const quiz = Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz non trouvé' });
      }

      // Soumettre la tentative
      const result = Quiz.submitAttempt(id, userId, answers);

      // Récupérer les questions avec les bonnes réponses pour afficher les résultats
      const questions = Quiz.getQuestions(id);
      const questionsWithResults = questions.map(q => ({
        id: q.id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer,
        user_answer: answers[q.id] || null,
        is_correct: answers[q.id] && answers[q.id].toUpperCase() === q.correct_answer.toUpperCase(),
        explanation: q.explanation
      }));

      // Vérifier et attribuer les badges si le quiz est réussi
      let newBadges = [];
      if (result.passed) {
        newBadges = Badge.checkAndAwardBadges(userId);
      }

      res.json({
        ...result,
        questions: questionsWithResults,
        newBadges: newBadges.length > 0 ? newBadges : null
      });
    } catch (error) {
      console.error('Erreur lors de la soumission du quiz:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Obtenir l'historique des tentatives d'un quiz
   */
  static getQuizAttempts(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const attempts = Quiz.getUserAttempts(id, userId);
      res.json(attempts);
    } catch (error) {
      console.error('Erreur lors de la récupération des tentatives:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Créer un nouveau quiz (admin)
   */
  static createQuiz(req, res) {
    try {
      const quiz = Quiz.create(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      console.error('Erreur lors de la création du quiz:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default QuizController;
