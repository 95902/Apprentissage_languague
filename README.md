# Plateforme d'Apprentissage avec LLM Local 🚀

Une plateforme web moderne d'apprentissage de langages de programmation intégrant un LLM local via Ollama.

## 📋 Fonctionnalités

### 1. Section Cours
- Modules organisés par langage (PHP, CSS, HTML, JavaScript, etc.)
- Leçons détaillées avec explications, code d'exemple et mini-exercices
- Barre de progression pour chaque module
- Suivi de l'avancement personnel

### 2. Section Quiz
- Quiz à choix multiples pour valider les connaissances
- Génération automatique de questions via LLM local
- Score en temps réel
- Historique des tentatives

### 3. Système de Badges
- **Débutant** : Premier module validé
- **Intermédiaire** : Premier quiz réussi
- **Expert** : Tous les modules d'un langage complétés
- Affichage sur le profil utilisateur

### 4. Assistant IA (LLM Local)
- Explications de concepts
- Aide au débogage de code
- Génération d'exercices personnalisés
- Création automatique de quiz

## 🏗️ Architecture Technique

### Backend
- **Framework** : Node.js + Express
- **Base de données** : SQLite
- **API REST** : Gestion utilisateurs, cours, quiz, badges
- **LLM Integration** : Ollama API

### Frontend
- **Framework** : React 18 + Vite
- **UI** : Design moderne et responsive
- **State Management** : Context API + React Hooks
- **Routing** : React Router
- **Styling** : CSS Modules + Dark Mode

### Base de Données
- `users` : Utilisateurs
- `courses` : Cours
- `lessons` : Leçons
- `quizzes` : Quiz
- `questions` : Questions
- `badges` : Badges
- `user_progress` : Progression utilisateur
- `user_badges` : Badges obtenus

## 🚀 Installation

### Prérequis
- Node.js >= 18
- npm ou yarn
- Ollama installé et configuré

### 1. Installation d'Ollama

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS
brew install ollama

# Démarrer Ollama
ollama serve

# Télécharger un modèle (ex: deepseek-coder)
ollama pull deepseek-coder:6.7b
# ou
ollama pull llama3
# ou
ollama pull mistral
```

### 2. Installation du Backend

```bash
cd backend
npm install
npm run init-db  # Initialise la base de données
npm run dev      # Démarre le serveur en mode développement
```

Le backend sera accessible sur `http://localhost:3000`

### 3. Installation du Frontend

```bash
cd frontend
npm install
npm run dev      # Démarre le serveur de développement
```

Le frontend sera accessible sur `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration

Créer un fichier `.env` dans le dossier `backend` :

```env
PORT=3000
DATABASE_PATH=./database/learning_platform.db
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-coder:6.7b
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend Configuration

Créer un fichier `.env` dans le dossier `frontend` :

```env
VITE_API_URL=http://localhost:3000/api
```

## 📚 Utilisation

### Démarrage rapide

1. Assurez-vous qu'Ollama est en cours d'exécution :
   ```bash
   ollama serve
   ```

2. Démarrez le backend :
   ```bash
   cd backend && npm run dev
   ```

3. Démarrez le frontend :
   ```bash
   cd frontend && npm run dev
   ```

4. Ouvrez votre navigateur sur `http://localhost:5173`

### Compte de test

Un utilisateur de test est créé automatiquement :
- **Email** : `user@example.com`
- **Mot de passe** : `password123`

## 🤖 API Ollama

### Endpoints Backend

- `POST /api/llm/explain` : Expliquer un concept
- `POST /api/llm/debug` : Aider au débogage
- `POST /api/llm/generate-exercise` : Générer un exercice
- `POST /api/llm/generate-quiz` : Générer un quiz

### Exemple d'utilisation

```javascript
// Expliquer un concept
const response = await fetch('http://localhost:3000/api/llm/explain', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'Les closures en JavaScript',
    level: 'beginner'
  })
});
```

## 📁 Structure du Projet

```
Apprentissage_languague/
├── backend/
│   ├── src/
│   │   ├── routes/          # Routes API
│   │   ├── controllers/     # Logique métier
│   │   ├── models/          # Modèles de données
│   │   ├── services/        # Services (Ollama, etc.)
│   │   ├── middleware/      # Middleware Express
│   │   └── config/          # Configuration
│   ├── database/            # Base de données SQLite
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Services API
│   │   ├── contexts/        # Contexts React
│   │   ├── hooks/           # Custom hooks
│   │   ├── assets/          # Images, icônes
│   │   └── styles/          # CSS global
│   └── package.json
├── docs/                    # Documentation
└── README.md
```

## 🎯 Exemples de Modules

### Module PHP Débutant
1. **Leçon 1** : Variables et types de données
2. **Leçon 2** : Conditions et boucles
3. **Leçon 3** : Fonctions
4. **Quiz** : 10 questions MCQ
5. **Badge** : Débutant PHP

## 🛠️ Développement

### Scripts disponibles

#### Backend
```bash
npm run dev          # Mode développement
npm run start        # Production
npm run init-db      # Initialiser la base de données
npm run seed         # Peupler avec des données de test
```

#### Frontend
```bash
npm run dev          # Mode développement
npm run build        # Build production
npm run preview      # Preview du build
```

## 🎨 Thèmes

La plateforme supporte le mode sombre par défaut, avec possibilité de basculer en mode clair.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 License

MIT

## 👥 Auteur

Créé avec ❤️ pour l'apprentissage de la programmation
