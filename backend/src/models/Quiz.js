import db from '../config/database.js';

class Quiz {
  static findById(id) {
    return db.prepare('SELECT * FROM quizzes WHERE id = ?').get(id);
  }

  static getByCourse(courseId) {
    return db.prepare(`
      SELECT q.*,
        (SELECT COUNT(*) FROM questions WHERE quiz_id = q.id) as total_questions
      FROM quizzes q
      WHERE q.course_id = ?
    `).all(courseId);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO quizzes (course_id, title, description, passing_score)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.course_id,
      data.title,
      data.description,
      data.passing_score || 70
    );
    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    const allowedFields = ['title', 'description', 'passing_score'];
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    });

    if (fields.length === 0) return this.findById(id);

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE quizzes SET ${fields.join(', ')}
      WHERE id = ?
    `);
    stmt.run(...values);
    return this.findById(id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM quizzes WHERE id = ?').run(id);
  }

  // Récupérer toutes les questions d'un quiz
  static getQuestions(quizId) {
    return db.prepare(`
      SELECT * FROM questions
      WHERE quiz_id = ?
      ORDER BY id
    `).all(quizId);
  }

  // Récupérer les questions sans les réponses correctes (pour l'affichage au quiz)
  static getQuestionsForQuiz(quizId) {
    return db.prepare(`
      SELECT id, question_text, option_a, option_b, option_c, option_d
      FROM questions
      WHERE quiz_id = ?
      ORDER BY id
    `).all(quizId);
  }

  // Soumettre une tentative de quiz
  static submitAttempt(quizId, userId, answers) {
    const questions = this.getQuestions(quizId);
    let correctCount = 0;

    // Calculer le score
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer.toUpperCase() === question.correct_answer.toUpperCase()) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const quiz = this.findById(quizId);
    const passed = score >= quiz.passing_score;

    // Enregistrer la tentative
    const stmt = db.prepare(`
      INSERT INTO quiz_attempts (user_id, quiz_id, score, passed, answers)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(userId, quizId, score, passed ? 1 : 0, JSON.stringify(answers));

    return {
      attemptId: result.lastInsertRowid,
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      passingScore: quiz.passing_score
    };
  }

  // Obtenir les tentatives d'un utilisateur pour un quiz
  static getUserAttempts(quizId, userId) {
    return db.prepare(`
      SELECT * FROM quiz_attempts
      WHERE quiz_id = ? AND user_id = ?
      ORDER BY completed_at DESC
    `).all(quizId, userId);
  }

  // Obtenir la meilleure tentative d'un utilisateur
  static getBestAttempt(quizId, userId) {
    return db.prepare(`
      SELECT * FROM quiz_attempts
      WHERE quiz_id = ? AND user_id = ?
      ORDER BY score DESC, completed_at DESC
      LIMIT 1
    `).get(quizId, userId);
  }

  // Statistiques d'un quiz
  static getStats(quizId) {
    const stats = db.prepare(`
      SELECT
        COUNT(DISTINCT user_id) as total_attempts,
        AVG(score) as average_score,
        MAX(score) as highest_score,
        MIN(score) as lowest_score,
        SUM(CASE WHEN passed = 1 THEN 1 ELSE 0 END) as total_passed
      FROM quiz_attempts
      WHERE quiz_id = ?
    `).get(quizId);

    return stats;
  }
}

export default Quiz;
