import db from '../config/database.js';

class User {
  static findById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }

  static findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }

  static create(email, hashedPassword, username) {
    const stmt = db.prepare(`
      INSERT INTO users (email, password, username)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(email, hashedPassword, username);
    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    if (data.email) {
      fields.push('email = ?');
      values.push(data.email);
    }
    if (data.username) {
      fields.push('username = ?');
      values.push(data.username);
    }
    if (data.password) {
      fields.push('password = ?');
      values.push(data.password);
    }

    if (fields.length === 0) return this.findById(id);

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE users SET ${fields.join(', ')}
      WHERE id = ?
    `);
    stmt.run(...values);
    return this.findById(id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
  }

  // Récupérer les badges d'un utilisateur
  static getBadges(userId) {
    return db.prepare(`
      SELECT b.*, ub.earned_at
      FROM badges b
      JOIN user_badges ub ON b.id = ub.badge_id
      WHERE ub.user_id = ?
      ORDER BY ub.earned_at DESC
    `).all(userId);
  }

  // Récupérer la progression d'un utilisateur
  static getProgress(userId) {
    return db.prepare(`
      SELECT
        c.id as course_id,
        c.title as course_title,
        c.language,
        c.total_lessons,
        COUNT(DISTINCT up.lesson_id) as completed_lessons,
        ROUND(COUNT(DISTINCT up.lesson_id) * 100.0 / c.total_lessons, 2) as progress_percentage
      FROM courses c
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ? AND up.completed = 1
      GROUP BY c.id
    `).all(userId);
  }

  // Obtenir les statistiques générales d'un utilisateur
  static getStats(userId) {
    const stats = db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM user_badges WHERE user_id = ?) as total_badges,
        (SELECT COUNT(*) FROM user_progress WHERE user_id = ? AND completed = 1) as completed_lessons,
        (SELECT COUNT(DISTINCT quiz_id) FROM quiz_attempts WHERE user_id = ? AND passed = 1) as passed_quizzes,
        (SELECT AVG(score) FROM quiz_attempts WHERE user_id = ?) as average_score
    `).get(userId, userId, userId, userId);

    return stats;
  }
}

export default User;
