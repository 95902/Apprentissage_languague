# Guide d'Hébergement Gratuit de la Plateforme 🚀

Ce guide présente plusieurs solutions pour héberger gratuitement votre plateforme d'apprentissage.

## ⚠️ Important : Contrainte du LLM Local

Le plus grand défi est **Ollama** qui nécessite :
- Beaucoup de RAM (8GB minimum)
- CPU puissant
- Stockage pour les modèles (4-7GB par modèle)

**Les hébergements gratuits ne supportent généralement PAS Ollama.**

### Solutions pour le LLM :

**Option A : Désactiver temporairement Ollama**
- La plateforme fonctionne sans l'Assistant IA
- Vous gardez les cours, quiz, badges

**Option B : API OpenAI/Anthropic (Payant mais avec crédits gratuits)**
- Remplacer Ollama par une API cloud
- OpenAI offre $5 de crédits gratuits
- Anthropic (Claude) offre des crédits d'essai

**Option C : Héberger Ollama localement**
- Ollama reste sur votre PC
- Le reste est hébergé en ligne
- Utilisez Ngrok pour exposer Ollama

---

## 🎯 Solutions d'Hébergement Recommandées

### **Solution 1 : Vercel (Frontend) + Render (Backend)** ⭐ RECOMMANDÉ

**Parfait pour :** Déploiement rapide et simple

#### Frontend sur Vercel

**Avantages :**
- ✅ Gratuit et illimité
- ✅ Déploiement automatique depuis Git
- ✅ CDN mondial (très rapide)
- ✅ HTTPS automatique
- ✅ Domaine gratuit (.vercel.app)

**Limitations :**
- ❌ Frontend uniquement

**Instructions :**

1. **Créer un compte sur [Vercel](https://vercel.com)**

2. **Préparer le frontend :**
```bash
cd frontend

# Créer vercel.json
cat > vercel.json << 'EOF'
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
EOF
```

3. **Déployer :**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Link to existing project? No
# - Project name: learning-platform
# - Which directory? ./
# - Override settings? No
```

4. **URL de production :**
Votre frontend sera sur : `https://learning-platform-xxx.vercel.app`

---

#### Backend sur Render

**Avantages :**
- ✅ 750h gratuites/mois (suffisant)
- ✅ Base de données PostgreSQL gratuite
- ✅ Déploiement depuis Git
- ✅ HTTPS automatique

**Limitations :**
- ❌ Se met en veille après 15min d'inactivité
- ❌ Redémarre lentement (30-60s)
- ❌ 512MB RAM (limite pour Ollama impossible)

**Instructions :**

1. **Créer un compte sur [Render](https://render.com)**

2. **Adapter le backend pour PostgreSQL :**

Créez `backend/src/config/database-postgres.js` :
```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
```

3. **Créer `render.yaml` à la racine :**
```yaml
services:
  - type: web
    name: learning-platform-api
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: learning-db
          property: connectionString

databases:
  - name: learning-db
    plan: free
```

4. **Déployer sur Render :**
- Connectez votre repo GitHub
- Render détectera `render.yaml`
- Le déploiement est automatique

5. **URL du backend :**
`https://learning-platform-api.onrender.com`

---

### **Solution 2 : Netlify (Frontend) + Railway (Backend)** ⭐

#### Frontend sur Netlify

**Avantages :**
- ✅ 100GB/mois de bande passante
- ✅ Déploiement Git automatique
- ✅ HTTPS + domaine gratuit
- ✅ Formulaires et fonctions serverless

**Instructions :**

1. **Créer un compte [Netlify](https://netlify.com)**

2. **Créer `netlify.toml` dans frontend/ :**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. **Déployer :**
```bash
# Via interface web
# ou CLI
npm i -g netlify-cli
netlify login
cd frontend
netlify deploy --prod
```

---

#### Backend sur Railway

**Avantages :**
- ✅ $5 de crédits gratuits/mois
- ✅ Supporte SQLite et PostgreSQL
- ✅ Pas de mise en veille
- ✅ Plus rapide que Render

**Limitations :**
- ⚠️ Crédits limités à $5/mois
- ❌ Pas de RAM suffisante pour Ollama

**Instructions :**

1. **Créer un compte [Railway](https://railway.app)**

2. **New Project → Deploy from GitHub**

3. **Configurer les variables d'environnement :**
```
NODE_ENV=production
JWT_SECRET=votre_secret_securise
DATABASE_PATH=/app/data/learning_platform.db
CORS_ORIGIN=https://votre-frontend.netlify.app
PORT=3000
```

4. **Activer le volume persistant** (pour SQLite)
- Settings → Volumes
- Mount path: `/app/data`

---

### **Solution 3 : GitHub Pages (Frontend) + Fly.io (Backend)**

#### Frontend sur GitHub Pages

**Avantages :**
- ✅ 100% gratuit
- ✅ Intégré à GitHub
- ✅ HTTPS gratuit

**Limitations :**
- ❌ Pas de backend
- ❌ Uniquement sites statiques

**Instructions :**

1. **Installer gh-pages :**
```bash
cd frontend
npm install --save-dev gh-pages
```

2. **Modifier `package.json` :**
```json
{
  "homepage": "https://username.github.io/Apprentissage_languague",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Déployer :**
```bash
npm run deploy
```

---

#### Backend sur Fly.io

**Avantages :**
- ✅ 3 VMs gratuites
- ✅ 160GB de bande passante/mois
- ✅ Support Docker
- ✅ Volumes persistants

**Instructions :**

1. **Installer Fly CLI :**
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Créer `Dockerfile` dans backend/ :**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

3. **Déployer :**
```bash
cd backend
fly launch
fly deploy
```

---

## 📊 Tableau Comparatif

| Service | Type | Gratuit | RAM | Limite | Recommandé |
|---------|------|---------|-----|--------|------------|
| **Vercel** | Frontend | ✅ Oui | - | 100GB/mois | ⭐⭐⭐⭐⭐ |
| **Netlify** | Frontend | ✅ Oui | - | 100GB/mois | ⭐⭐⭐⭐ |
| **GitHub Pages** | Frontend | ✅ Oui | - | 1GB stockage | ⭐⭐⭐ |
| **Render** | Backend | ✅ Oui | 512MB | Veille 15min | ⭐⭐⭐⭐ |
| **Railway** | Backend | ⚠️ $5/mois | 512MB | Crédits | ⭐⭐⭐⭐ |
| **Fly.io** | Backend | ✅ Oui | 256MB | 3 VMs | ⭐⭐⭐ |
| **Heroku** | Backend | ❌ Plus gratuit | - | - | ❌ |

---

## 🔧 Configuration Recommandée

### **Pour démarrer rapidement :**

```
Frontend: Vercel (gratuit, illimité)
Backend: Render (gratuit, 750h/mois)
Base de données: PostgreSQL sur Render (gratuit)
LLM: Désactivé (ou API OpenAI avec crédits gratuits)
```

**Coût total : 0€**

---

## 🎯 Guide Pas à Pas : Solution Complète

### **Étape 1 : Préparer le Code**

```bash
# Cloner le projet
git clone votre-repo
cd Apprentissage_languague

# Frontend : Mettre à jour l'URL de l'API
cd frontend
cat > .env << EOF
VITE_API_URL=https://votre-backend.onrender.com/api
EOF

# Backend : Variables d'environnement
cd ../backend
cat > .env << EOF
NODE_ENV=production
JWT_SECRET=$(openssl rand -base64 32)
DATABASE_URL=postgresql://...
CORS_ORIGIN=https://votre-frontend.vercel.app
EOF
```

### **Étape 2 : Déployer le Backend sur Render**

1. Créer compte sur [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure :
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables (voir ci-dessus)
6. Create Web Service
7. Attendre le déploiement (~5min)
8. Copier l'URL : `https://xxx.onrender.com`

### **Étape 3 : Déployer le Frontend sur Vercel**

1. Créer compte sur [vercel.com](https://vercel.com)
2. Add New Project
3. Import Git Repository
4. Configure :
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable :
   ```
   VITE_API_URL=https://xxx.onrender.com/api
   ```
6. Deploy
7. Votre site est en ligne !

### **Étape 4 : Tester**

1. Ouvrir l'URL Vercel
2. Se connecter : `user@example.com` / `password123`
3. Parcourir les cours
4. Passer un quiz
5. Gagner des badges !

---

## 🚨 Désactiver Ollama (Temporaire)

Si vous voulez héberger sans Ollama pour l'instant :

**1. Modifier `backend/src/controllers/llmController.js` :**

```javascript
// Désactiver temporairement toutes les méthodes
static async checkHealth(req, res) {
  res.json({
    available: false,
    message: "LLM désactivé en production"
  });
}

// Faire pareil pour toutes les méthodes...
```

**2. Ou masquer le lien "Assistant IA" :**

Dans `frontend/src/components/Navbar.jsx`, commentez :
```jsx
{/* <Link to="/assistant" className="navbar-link">Assistant IA</Link> */}
```

---

## 🌐 Utiliser une API LLM Cloud (Alternative)

### **Option : Remplacer Ollama par OpenAI**

**1. Créer un compte [OpenAI](https://platform.openai.com)**
- Vous recevez $5 de crédits gratuits

**2. Modifier `backend/src/services/ollamaService.js` :**

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class LLMService {
  static async generate(prompt) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  }

  // Adapter les autres méthodes...
}
```

**3. Ajouter la variable d'environnement :**
```
OPENAI_API_KEY=sk-...
```

**Coût estimé :** ~0.002$/requête (très peu cher)

---

## 📝 Checklist Avant Déploiement

- [ ] Frontend build sans erreurs
- [ ] Backend démarre localement
- [ ] Variables d'environnement configurées
- [ ] CORS configuré correctement
- [ ] JWT_SECRET sécurisé (généré aléatoirement)
- [ ] Base de données initialisée
- [ ] Cours importés
- [ ] Tests de connexion
- [ ] Tests des fonctionnalités principales

---

## 🆘 Dépannage

### **Erreur CORS**
```javascript
// backend/src/index.js
app.use(cors({
  origin: [
    'https://votre-frontend.vercel.app',
    'http://localhost:5173' // Pour dev local
  ],
  credentials: true
}));
```

### **Backend se met en veille (Render)**
Solution : Utiliser un service de "ping" gratuit
- [UptimeRobot](https://uptimerobot.com) - Ping toutes les 5min
- [Cron-job.org](https://cron-job.org) - Ping personnalisé

### **Base de données réinitialisée**
Sur Render/Railway, utilisez un volume persistant ou PostgreSQL

---

## 💰 Coûts Réels

### **100% Gratuit (avec limitations)**
- Vercel (Frontend) : **0€**
- Render (Backend) : **0€** (avec veille)
- PostgreSQL : **0€** (500MB)
- **Total : 0€/mois**

### **Avec API LLM (Recommandé)**
- Hébergement : **0€**
- OpenAI API : **~2-5€/mois** (selon utilisation)
- **Total : 2-5€/mois**

### **Production (Aucune limitation)**
- Vercel Pro : **20€/mois**
- Render (pas de veille) : **7€/mois**
- Base de données : **7€/mois**
- **Total : 34€/mois**

---

## 🚀 Prochaines Étapes

1. **Choisissez votre solution** (Recommandé : Vercel + Render)
2. **Suivez le guide pas à pas** ci-dessus
3. **Testez en ligne**
4. **Partagez avec vos étudiants !**

---

## 📚 Ressources Supplémentaires

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Render](https://render.com/docs)
- [Documentation Netlify](https://docs.netlify.com)
- [Documentation Railway](https://docs.railway.app)
- [Guide PostgreSQL](https://www.postgresql.org/docs/)

---

## ✅ Solution Finale Recommandée

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Frontend (React)                               │
│  ↓                                              │
│  Vercel                                         │
│  https://learning-platform.vercel.app           │
│  Gratuit, Rapide, CDN                          │
│                                                 │
└─────────────────────────────────────────────────┘
                      ↓
                    HTTPS
                      ↓
┌─────────────────────────────────────────────────┐
│                                                 │
│  Backend (Node.js + Express)                    │
│  ↓                                              │
│  Render                                         │
│  https://learning-api.onrender.com              │
│  Gratuit, PostgreSQL inclus                    │
│                                                 │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                                                 │
│  Base de Données PostgreSQL                     │
│  ↓                                              │
│  Render (même service)                          │
│  Gratuit, 1GB stockage                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**LLM/IA :** OpenAI API ($5 gratuits) ou désactivé

---

Besoin d'aide pour le déploiement ? Consultez ce guide ou demandez ! 🚀
