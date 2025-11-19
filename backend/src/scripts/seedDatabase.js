import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, '../../database/learning_platform.db');
const seedPath = join(__dirname, '../../database/seed.sql');

if (!fs.existsSync(dbPath)) {
  console.error('❌ Base de données non trouvée. Exécutez d\'abord : npm run init-db');
  process.exit(1);
}

console.log('🌱 Peuplement de la base de données...');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Lire et exécuter les données d'exemple
const seedData = fs.readFileSync(seedPath, 'utf8');
db.exec(seedData);

// Créer un utilisateur de test
const hashedPassword = bcrypt.hashSync('password123', 10);
const insertUser = db.prepare(`
  INSERT INTO users (email, password, username)
  VALUES (?, ?, ?)
`);

insertUser.run('user@example.com', hashedPassword, 'DemoUser');
console.log('👤 Utilisateur de test créé : user@example.com / password123');

// Afficher les statistiques
const stats = {
  users: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
  courses: db.prepare('SELECT COUNT(*) as count FROM courses').get().count,
  lessons: db.prepare('SELECT COUNT(*) as count FROM lessons').get().count,
  quizzes: db.prepare('SELECT COUNT(*) as count FROM quizzes').get().count,
  questions: db.prepare('SELECT COUNT(*) as count FROM questions').get().count,
  badges: db.prepare('SELECT COUNT(*) as count FROM badges').get().count
};

console.log('\n📊 Statistiques :');
console.log(`   - Utilisateurs : ${stats.users}`);
console.log(`   - Cours : ${stats.courses}`);
console.log(`   - Leçons : ${stats.lessons}`);
console.log(`   - Quiz : ${stats.quizzes}`);
console.log(`   - Questions : ${stats.questions}`);
console.log(`   - Badges : ${stats.badges}`);

db.close();
console.log('\n✅ Base de données peuplée avec succès !');
