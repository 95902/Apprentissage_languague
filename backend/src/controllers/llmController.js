import OllamaService from '../services/ollamaService.js';

class LLMController {
  /**
   * Vérifier la santé d'Ollama
   */
  static async checkHealth(req, res) {
    try {
      const health = await OllamaService.checkHealth();
      res.json(health);
    } catch (error) {
      console.error('Erreur lors de la vérification de santé:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  /**
   * Expliquer un concept
   */
  static async explainConcept(req, res) {
    try {
      const { topic, language, level } = req.body;

      if (!topic || !language) {
        return res.status(400).json({ error: 'Topic et language sont requis' });
      }

      const explanation = await OllamaService.explainConcept(
        topic,
        language,
        level || 'beginner'
      );

      res.json({
        topic,
        language,
        level: level || 'beginner',
        explanation
      });
    } catch (error) {
      console.error('Erreur lors de l\'explication:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Aider au débogage
   */
  static async debugCode(req, res) {
    try {
      const { code, language, error } = req.body;

      if (!code || !language) {
        return res.status(400).json({ error: 'Code et language sont requis' });
      }

      const help = await OllamaService.debugCode(code, language, error);

      res.json({
        language,
        help
      });
    } catch (error) {
      console.error('Erreur lors du débogage:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Générer un exercice
   */
  static async generateExercise(req, res) {
    try {
      const { language, topic, level } = req.body;

      if (!language || !topic) {
        return res.status(400).json({ error: 'Language et topic sont requis' });
      }

      const exercise = await OllamaService.generateExercise(
        language,
        topic,
        level || 'beginner'
      );

      res.json({
        language,
        topic,
        level: level || 'beginner',
        exercise
      });
    } catch (error) {
      console.error('Erreur lors de la génération de l\'exercice:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Générer un quiz
   */
  static async generateQuiz(req, res) {
    try {
      const { language, topic, numberOfQuestions } = req.body;

      if (!language || !topic) {
        return res.status(400).json({ error: 'Language et topic sont requis' });
      }

      const quiz = await OllamaService.generateQuiz(
        language,
        topic,
        numberOfQuestions || 5
      );

      res.json({
        language,
        topic,
        quiz
      });
    } catch (error) {
      console.error('Erreur lors de la génération du quiz:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Suggérer du code
   */
  static async suggestCode(req, res) {
    try {
      const { description, language } = req.body;

      if (!description || !language) {
        return res.status(400).json({ error: 'Description et language sont requis' });
      }

      const suggestion = await OllamaService.suggestCode(description, language);

      res.json({
        language,
        description,
        suggestion
      });
    } catch (error) {
      console.error('Erreur lors de la suggestion de code:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Améliorer du code
   */
  static async improveCode(req, res) {
    try {
      const { code, language } = req.body;

      if (!code || !language) {
        return res.status(400).json({ error: 'Code et language sont requis' });
      }

      const improvement = await OllamaService.improveCode(code, language);

      res.json({
        language,
        improvement
      });
    } catch (error) {
      console.error('Erreur lors de l\'amélioration du code:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Expliquer du code
   */
  static async explainCode(req, res) {
    try {
      const { code, language } = req.body;

      if (!code || !language) {
        return res.status(400).json({ error: 'Code et language sont requis' });
      }

      const explanation = await OllamaService.explainCode(code, language);

      res.json({
        language,
        explanation
      });
    } catch (error) {
      console.error('Erreur lors de l\'explication du code:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default LLMController;
