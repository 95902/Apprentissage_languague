# Guide d'Installation - Plateforme d'Apprentissage avec LLM

Ce guide vous accompagne pas à pas pour installer et démarrer la plateforme d'apprentissage.

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation d'Ollama](#installation-dollama)
3. [Installation du Backend](#installation-du-backend)
4. [Installation du Frontend](#installation-du-frontend)
5. [Démarrage de l'application](#démarrage-de-lapplication)
6. [Configuration avancée](#configuration-avancée)
7. [Dépannage](#dépannage)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18 ou supérieure
  ```bash
  node --version  # Doit afficher v18.x.x ou supérieur
  ```

- **npm** (fourni avec Node.js)
  ```bash
  npm --version
  ```

- **Git** (pour cloner le projet)
  ```bash
  git --version
  ```

---

## Installation d'Ollama

Ollama est le moteur LLM local qui alimente l'assistant IA.

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### macOS

```bash
brew install ollama
```

### Windows

Téléchargez l'installateur depuis [ollama.com](https://ollama.com)

### Démarrer Ollama

```bash
# Démarrer le service Ollama
ollama serve
```

Laissez cette fenêtre de terminal ouverte. Ollama est maintenant accessible sur `http://localhost:11434`

### Télécharger un modèle LLM

Dans un **nouveau terminal** :

```bash
# Recommandé pour le code (plus léger)
ollama pull deepseek-coder:6.7b

# Alternative 1 : Modèle généraliste
ollama pull llama3

# Alternative 2 : Modèle rapide
ollama pull mistral

# Vérifier les modèles installés
ollama list
```

**Note :** Le téléchargement peut prendre plusieurs minutes selon votre connexion.

---

## Installation du Backend

### 1. Naviguer vers le dossier backend

```bash
cd backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à partir du template :

```bash
cp .env.example .env
```

Éditez le fichier `.env` et modifiez si nécessaire :

```env
PORT=3000
DATABASE_PATH=./database/learning_platform.db
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-coder:6.7b  # Utilisez le modèle téléchargé
JWT_SECRET=votre_secret_jwt_securise_ici
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Important :** Changez `JWT_SECRET` par une chaîne aléatoire sécurisée en production !

### 4. Initialiser la base de données

```bash
npm run init-db
```

Vous devriez voir :
```
✅ Base de données initialisée avec succès !
📊 Tables créées :
   - users
   - courses
   - lessons
   - quizzes
   - questions
   - badges
   - user_progress
   - user_badges
   - quiz_attempts
```

### 5. Peupler avec des données d'exemple

```bash
npm run seed
```

Vous devriez voir :
```
👤 Utilisateur de test créé : user@example.com / password123
📊 Statistiques :
   - Utilisateurs : 1
   - Cours : 9
   - Leçons : 6
   - Quiz : 1
   - Questions : 10
   - Badges : 10
✅ Base de données peuplée avec succès !
```

### 6. Démarrer le serveur backend

```bash
npm run dev
```

Le backend devrait démarrer sur `http://localhost:3000`

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     🚀  Serveur de la Plateforme d'Apprentissage  🚀       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

📡 Serveur démarré sur le port 3000
🌍 URL: http://localhost:3000
🔧 Environnement: development
```

Laissez ce terminal ouvert.

---

## Installation du Frontend

### 1. Ouvrir un nouveau terminal

Dans le dossier racine du projet :

```bash
cd frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` :

```bash
cp .env.example .env
```

Le fichier `.env` devrait contenir :

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le frontend devrait s'ouvrir automatiquement sur `http://localhost:5173`

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Démarrage de l'application

Vous devriez maintenant avoir **3 terminaux ouverts** :

1. **Terminal 1** : Ollama
   ```bash
   ollama serve
   ```

2. **Terminal 2** : Backend
   ```bash
   cd backend
   npm run dev
   ```

3. **Terminal 3** : Frontend
   ```bash
   cd frontend
   npm run dev
   ```

### Accéder à l'application

Ouvrez votre navigateur sur : **http://localhost:5173**

### Se connecter avec le compte de test

- **Email** : `user@example.com`
- **Mot de passe** : `password123`

---

## Configuration avancée

### Changer le modèle LLM

Dans `backend/.env`, modifiez :

```env
OLLAMA_MODEL=llama3  # ou mistral, codellama, etc.
```

Redémarrez le backend :

```bash
# Dans le terminal backend, arrêtez avec Ctrl+C puis :
npm run dev
```

### Changer le port du backend

Dans `backend/.env` :

```env
PORT=4000
```

N'oubliez pas de mettre à jour `frontend/.env` :

```env
VITE_API_URL=http://localhost:4000/api
```

### Build de production

#### Backend

```bash
cd backend
npm run start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

---

## Dépannage

### Erreur : "Impossible de communiquer avec Ollama"

**Solution :**

1. Vérifiez qu'Ollama est bien lancé :
   ```bash
   curl http://localhost:11434/api/tags
   ```

2. Si la commande échoue, redémarrez Ollama :
   ```bash
   ollama serve
   ```

3. Vérifiez que le modèle est téléchargé :
   ```bash
   ollama list
   ```

### Erreur : "Port 3000 already in use"

**Solution :**

Changez le port dans `backend/.env` :

```env
PORT=3001
```

Et mettez à jour `frontend/.env` :

```env
VITE_API_URL=http://localhost:3001/api
```

### Erreur : "Token invalide ou expiré"

**Solution :**

Déconnectez-vous et reconnectez-vous, ou supprimez le localStorage :

```javascript
// Dans la console du navigateur (F12)
localStorage.removeItem('token')
```

### La base de données ne se crée pas

**Solution :**

Supprimez le fichier de base de données et réinitialisez :

```bash
cd backend
rm database/learning_platform.db
npm run init-db
npm run seed
```

### Les styles ne s'affichent pas correctement

**Solution :**

Videz le cache du navigateur ou utilisez le mode incognito.

### L'Assistant IA ne répond pas

**Vérifications :**

1. Ollama est-il lancé ?
   ```bash
   curl http://localhost:11434/api/tags
   ```

2. Le modèle est-il téléchargé ?
   ```bash
   ollama list
   ```

3. Le backend peut-il communiquer avec Ollama ?
   - Vérifiez les logs du terminal backend
   - Testez l'endpoint health :
     ```bash
     curl http://localhost:3000/api/llm/health
     ```

---

## Commandes utiles

### Backend

```bash
npm run dev          # Mode développement avec auto-reload
npm run start        # Mode production
npm run init-db      # Réinitialiser la base de données
npm run seed         # Ajouter des données d'exemple
```

### Frontend

```bash
npm run dev          # Mode développement
npm run build        # Build pour la production
npm run preview      # Prévisualiser le build
```

### Ollama

```bash
ollama serve         # Démarrer Ollama
ollama list          # Lister les modèles installés
ollama pull <model>  # Télécharger un modèle
ollama rm <model>    # Supprimer un modèle
```

---

## Architecture du projet

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
│   │   └── styles/          # CSS
│   └── package.json
└── docs/                    # Documentation
```

---

## Support

Pour toute question ou problème :

1. Vérifiez la section [Dépannage](#dépannage)
2. Consultez les logs dans les terminaux
3. Vérifiez que tous les prérequis sont installés

Bon apprentissage ! 🚀
