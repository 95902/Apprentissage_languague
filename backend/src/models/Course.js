import db from '../config/database.js';

class Course {
  static getAll() {
    return db.prepare(`
      SELECT * FROM courses
      ORDER BY language, level
    `).all();
  }

  static findById(id) {
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  }

  static getByLanguage(language) {
    return db.prepare(`
      SELECT * FROM courses
      WHERE language = ?
      ORDER BY level
    `).all(language);
  }

  static getByLevel(level) {
    return db.prepare(`
      SELECT * FROM courses
      WHERE level = ?
      ORDER BY language
    `).all(level);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO courses (title, description, language, level, total_lessons, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.title,
      data.description,
      data.language,
      data.level,
      data.total_lessons || 0,
      data.image_url || null
    );
    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    const allowedFields = ['title', 'description', 'language', 'level', 'total_lessons', 'image_url'];
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
      UPDATE courses SET ${fields.join(', ')}
      WHERE id = ?
    `);
    stmt.run(...values);
    return this.findById(id);
  }

  static delete(id) {
    return db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  }

  // Récupérer toutes les leçons d'un cours
  static getLessons(courseId) {
    return db.prepare(`
      SELECT * FROM lessons
      WHERE course_id = ?
      ORDER BY order_index
    `).all(courseId);
  }

  // Récupérer les leçons d'un cours avec la progression de l'utilisateur
  static getLessonsWithProgress(courseId, userId) {
    return db.prepare(`
      SELECT
        l.*,
        CASE WHEN up.completed = 1 THEN 1 ELSE 0 END as is_completed,
        up.completed_at
      FROM lessons l
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
      WHERE l.course_id = ?
      ORDER BY l.order_index
    `).all(userId, courseId);
  }

  // Récupérer les quiz d'un cours
  static getQuizzes(courseId) {
    return db.prepare(`
      SELECT q.*,
        (SELECT COUNT(*) FROM questions WHERE quiz_id = q.id) as total_questions
      FROM quizzes q
      WHERE q.course_id = ?
    `).all(courseId);
  }

  // Obtenir les statistiques d'un cours
  static getStats(courseId) {
    const stats = db.prepare(`
      SELECT
        (SELECT COUNT(*) FROM lessons WHERE course_id = ?) as total_lessons,
        (SELECT COUNT(*) FROM quizzes WHERE course_id = ?) as total_quizzes,
        (SELECT COUNT(DISTINCT user_id) FROM user_progress up
         JOIN lessons l ON up.lesson_id = l.id
         WHERE l.course_id = ? AND up.completed = 1) as total_students
    `).get(courseId, courseId, courseId);

    return stats;
  }
}

export default Course;
