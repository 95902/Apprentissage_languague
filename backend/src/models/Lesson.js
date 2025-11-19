import db from '../config/database.js';

class Lesson {
  static findById(id) {
    return db.prepare('SELECT * FROM lessons WHERE id = ?').get(id);
  }

  static getByCourse(courseId) {
    return db.prepare(`
      SELECT * FROM lessons
      WHERE course_id = ?
      ORDER BY order_index
    `).all(courseId);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO lessons (
        course_id, title, description, content, code_example,
        exercise, order_index, duration
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.course_id,
      data.title,
      data.description,
      data.content,
      data.code_example || null,
      data.exercise || null,
      data.order_index,
      data.duration || 0
    );

    // Mettre à jour le nombre total de leçons du cours
    this.updateCourseLessonCount(data.course_id);

    return this.findById(result.lastInsertRowid);
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    const allowedFields = ['title', 'description', 'content', 'code_example', 'exercise', 'order_index', 'duration'];
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
      UPDATE lessons SET ${fields.join(', ')}
      WHERE id = ?
    `);
    stmt.run(...values);
    return this.findById(id);
  }

  static delete(id) {
    const lesson = this.findById(id);
    const result = db.prepare('DELETE FROM lessons WHERE id = ?').run(id);

    if (lesson) {
      this.updateCourseLessonCount(lesson.course_id);
    }

    return result;
  }

  // Marquer une leçon comme complétée
  static markAsCompleted(lessonId, userId) {
    const stmt = db.prepare(`
      INSERT INTO user_progress (user_id, lesson_id, completed, completed_at)
      VALUES (?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, lesson_id)
      DO UPDATE SET completed = 1, completed_at = CURRENT_TIMESTAMP
    `);
    return stmt.run(userId, lessonId);
  }

  // Vérifier si une leçon est complétée
  static isCompleted(lessonId, userId) {
    const result = db.prepare(`
      SELECT completed FROM user_progress
      WHERE user_id = ? AND lesson_id = ?
    `).get(userId, lessonId);

    return result ? result.completed === 1 : false;
  }

  // Obtenir la progression d'une leçon
  static getProgress(lessonId, userId) {
    return db.prepare(`
      SELECT * FROM user_progress
      WHERE lesson_id = ? AND user_id = ?
    `).get(lessonId, userId);
  }

  // Mettre à jour le compteur de leçons d'un cours
  static updateCourseLessonCount(courseId) {
    const count = db.prepare(`
      SELECT COUNT(*) as total FROM lessons WHERE course_id = ?
    `).get(courseId).total;

    db.prepare(`
      UPDATE courses SET total_lessons = ? WHERE id = ?
    `).run(count, courseId);
  }
}

export default Lesson;
