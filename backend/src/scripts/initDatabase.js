import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, '../../database/learning_platform.db');
const schemaPath = join(__dirname, '../../database/schema.sql');

// Créer le dossier database s'il n'existe pas
const dbDir = dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

console.log('🗄️  Initialisation de la base de données...');
console.log('📍 Chemin:', dbPath);

// Supprimer l'ancienne base si elle existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  Ancienne base de données supprimée');
}

// Créer la nouvelle base
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Lire et exécuter le schéma
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

console.log('✅ Base de données initialisée avec succès !');
console.log('📊 Tables créées :');

// Lister les tables créées
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
tables.forEach(table => {
  console.log(`   - ${table.name}`);
});

db.close();
console.log('\n✨ Vous pouvez maintenant peupler la base avec : npm run seed');
