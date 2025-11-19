import db from '../config/database.js';

class Badge {
  static getAll() {
    return db.prepare('SELECT * FROM badges ORDER BY id').all();
  }

  static findById(id) {
    return db.prepare('SELECT * FROM badges WHERE id = ?').get(id);
  }

  static create(data) {
    const stmt = db.prepare(`
      INSERT INTO badges (name, description, icon, criteria, language)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.description,
      data.icon || '🏅',
      data.criteria,
      data.language || null
    );
    return this.findById(result.lastInsertRowid);
  }

  static delete(id) {
    return db.prepare('DELETE FROM badges WHERE id = ?').run(id);
  }

  // Attribuer un badge à un utilisateur
  static awardToUser(badgeId, userId) {
    try {
      const stmt = db.prepare(`
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (?, ?)
      `);
      return stmt.run(userId, badgeId);
    } catch (error) {
      // Badge déjà attribué (UNIQUE constraint)
      if (error.code === 'SQLITE_CONSTRAINT') {
        return null;
      }
      throw error;
    }
  }

  // Vérifier si un utilisateur a un badge
  static userHasBadge(badgeId, userId) {
    const result = db.prepare(`
      SELECT * FROM user_badges
      WHERE user_id = ? AND badge_id = ?
    `).get(userId, badgeId);

    return result !== undefined;
  }

  // Vérifier et attribuer les badges automatiquement
  static checkAndAwardBadges(userId) {
    const awardedBadges = [];

    // Badge "Premier module" - vérifie pour chaque langage
    const languages = ['PHP', 'JavaScript', 'CSS', 'HTML'];
    languages.forEach(language => {
      const badge = db.prepare(`
        SELECT * FROM badges
        WHERE criteria = 'first_module' AND language = ?
      `).get(language);

      if (badge && !this.userHasBadge(badge.id, userId)) {
        const completedFirstModule = db.prepare(`
          SELECT COUNT(DISTINCT c.id) as completed_courses
          FROM courses c
          JOIN lessons l ON c.id = l.course_id
          JOIN user_progress up ON l.id = up.lesson_id
          WHERE c.language = ? AND up.user_id = ? AND up.completed = 1
          GROUP BY c.id
          HAVING COUNT(DISTINCT l.id) >= 1
        `).get(language, userId);

        if (completedFirstModule) {
          this.awardToUser(badge.id, userId);
          awardedBadges.push(badge);
        }
      }
    });

    // Badge "Premier quiz"
    const firstQuizBadge = db.prepare(`
      SELECT * FROM badges WHERE criteria = 'first_quiz'
    `).get();

    if (firstQuizBadge && !this.userHasBadge(firstQuizBadge.id, userId)) {
      const passedQuiz = db.prepare(`
        SELECT * FROM quiz_attempts
        WHERE user_id = ? AND passed = 1
        LIMIT 1
      `).get(userId);

      if (passedQuiz) {
        this.awardToUser(firstQuizBadge.id, userId);
        awardedBadges.push(firstQuizBadge);
      }
    }

    // Badge "Expert" - tous les modules d'un langage complétés
    languages.forEach(language => {
      const badge = db.prepare(`
        SELECT * FROM badges
        WHERE criteria = 'complete_language' AND language = ?
      `).get(language);

      if (badge && !this.userHasBadge(badge.id, userId)) {
        const stats = db.prepare(`
          SELECT
            COUNT(DISTINCT c.id) as total_courses,
            COUNT(DISTINCT CASE WHEN all_lessons_completed = 1 THEN c.id END) as completed_courses
          FROM courses c
          LEFT JOIN (
            SELECT l.course_id,
                   CASE WHEN COUNT(l.id) = COUNT(up.lesson_id) THEN 1 ELSE 0 END as all_lessons_completed
            FROM lessons l
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ? AND up.completed = 1
            GROUP BY l.course_id
          ) course_progress ON c.id = course_progress.course_id
          WHERE c.language = ?
        `).get(userId, language);

        if (stats.total_courses > 0 && stats.total_courses === stats.completed_courses) {
          this.awardToUser(badge.id, userId);
          awardedBadges.push(badge);
        }
      }
    });

    // Badge "Maître du Code" - tous les modules de tous les langages
    const masterBadge = db.prepare(`
      SELECT * FROM badges WHERE criteria = 'complete_all'
    `).get();

    if (masterBadge && !this.userHasBadge(masterBadge.id, userId)) {
      const stats = db.prepare(`
        SELECT
          COUNT(DISTINCT c.id) as total_courses,
          COUNT(DISTINCT CASE WHEN all_lessons_completed = 1 THEN c.id END) as completed_courses
        FROM courses c
        LEFT JOIN (
          SELECT l.course_id,
                 CASE WHEN COUNT(l.id) = COUNT(up.lesson_id) THEN 1 ELSE 0 END as all_lessons_completed
          FROM lessons l
          LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ? AND up.completed = 1
          GROUP BY l.course_id
        ) course_progress ON c.id = course_progress.course_id
      `).get(userId);

      if (stats.total_courses > 0 && stats.total_courses === stats.completed_courses) {
        this.awardToUser(masterBadge.id, userId);
        awardedBadges.push(masterBadge);
      }
    }

    return awardedBadges;
  }
}

export default Badge;
