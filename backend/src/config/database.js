import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, '../../database/learning_platform.db');

// Créer le dossier database s'il n'existe pas
const dbDir = dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Créer la connexion à la base de données
const db = new Database(dbPath);

// Activer les foreign keys
db.pragma('foreign_keys = ON');

// Activer le mode WAL pour de meilleures performances
db.pragma('journal_mode = WAL');

export default db;
