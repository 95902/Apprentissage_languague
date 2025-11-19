import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, '../../database/learning_platform.db');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Base de données non trouvée. Exécutez d\'abord : npm run init-db');
  process.exit(1);
}

console.log('📚 Importation des cours PHP...\n');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

try {
  // Lire les fichiers SQL
  const coursDebutant = fs.readFileSync(
    join(__dirname, '../database/cours_php_complet.sql'),
    'utf8'
  );

  const coursIntermediaire = fs.readFileSync(
    join(__dirname, '../database/cours_php_intermediaire.sql'),
    'utf8'
  );

  // Exécuter les scripts
  console.log('📝 Importation du cours PHP Débutant...');
  db.exec(coursDebutant);
  console.log('✅ Cours PHP Débutant importé');

  console.log('\n📝 Importation du cours PHP Intermédiaire...');
  db.exec(coursIntermediaire);
  console.log('✅ Cours PHP Intermédiaire importé');

  // Afficher les statistiques
  const stats = {
    courses: db.prepare('SELECT COUNT(*) as count FROM courses WHERE language = "PHP"').get().count,
    lessons: db.prepare(`
      SELECT COUNT(*) as count FROM lessons l
      JOIN courses c ON l.course_id = c.id
      WHERE c.language = "PHP"
    `).get().count,
    quizzes: db.prepare(`
      SELECT COUNT(*) as count FROM quizzes q
      JOIN courses c ON q.course_id = c.id
      WHERE c.language = "PHP"
    `).get().count
  };

  console.log('\n📊 Résumé de l\'importation :');
  console.log(`   - Cours PHP : ${stats.courses}`);
  console.log(`   - Leçons PHP : ${stats.lessons}`);
  console.log(`   - Quiz PHP : ${stats.quizzes}`);

  console.log('\n✨ Importation terminée avec succès !');
  console.log('\n💡 Conseil : Redémarrez le serveur backend pour voir les nouveaux cours.');

} catch (error) {
  console.error('❌ Erreur lors de l\'importation:', error.message);
  process.exit(1);
} finally {
  db.close();
}
