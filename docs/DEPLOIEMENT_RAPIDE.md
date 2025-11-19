# Guide de Déploiement Rapide 🚀

Ce guide vous permet de déployer la plateforme en **moins de 30 minutes**.

## 🎯 Solution Recommandée : Vercel + Render

**Coût : GRATUIT**
**Temps : 20-30 minutes**

---

## 📋 Prérequis

- [ ] Compte GitHub
- [ ] Compte Vercel (créez-le sur [vercel.com](https://vercel.com))
- [ ] Compte Render (créez-le sur [render.com](https://render.com))
- [ ] Votre projet sur GitHub

---

## 🚀 Étape 1 : Préparer le Projet (5 min)

### 1.1 Mettre à jour le README

```bash
# Assurez-vous que votre projet est à jour
git status
git add .
git commit -m "Prêt pour déploiement"
git push origin main
```

### 1.2 Vérifier les fichiers de config

Ces fichiers doivent exister :
- ✅ `frontend/vercel.json`
- ✅ `frontend/netlify.toml`
- ✅ `render.yaml`
- ✅ `backend/Dockerfile`

---

## 🌐 Étape 2 : Déployer le Backend sur Render (10 min)

### 2.1 Créer le Service Web

1. Allez sur [dashboard.render.com](https://dashboard.render.com)
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repo GitHub
4. Sélectionnez votre projet

### 2.2 Configurer le Service

**Configuration :**
```
Name: learning-platform-api
Region: Frankfurt (ou le plus proche)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run init-db
Start Command: npm start
Plan: Free
```

### 2.3 Variables d'Environnement

Cliquez sur **"Advanced"** → **"Add Environment Variable"** :

```bash
NODE_ENV=production

# JWT Secret (générez-en un nouveau !)
JWT_SECRET=VotreSecretSuperSecuriseIci123456789

# Database
DATABASE_PATH=/opt/render/project/data/learning_platform.db

# CORS (vous mettrez l'URL Vercel plus tard)
CORS_ORIGIN=*

# Port
PORT=3000

# Ollama désactivé
OLLAMA_URL=disabled
OLLAMA_MODEL=disabled
```

### 2.4 Créer un Volume Persistant

1. Dans les paramètres du service
2. Allez dans **"Disks"**
3. Cliquez sur **"Add Disk"**
4. Configuration :
   ```
   Name: data
   Mount Path: /opt/render/project/data
   Size: 1 GB
   ```

### 2.5 Déployer

1. Cliquez sur **"Create Web Service"**
2. Attendez 5-10 minutes
3. Notez l'URL : `https://learning-platform-api.onrender.com`

### 2.6 Importer les Cours PHP

Une fois déployé, accédez au **Shell** :
1. Dans le dashboard → Shell
2. Exécutez :
```bash
cd backend
npm run import-php
```

---

## 🎨 Étape 3 : Déployer le Frontend sur Vercel (5 min)

### 3.1 Créer le Projet

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Cliquez sur **"Import Git Repository"**
3. Sélectionnez votre repo
4. Cliquez sur **"Import"**

### 3.2 Configurer le Projet

**Configuration :**
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.3 Variable d'Environnement

Ajoutez une variable d'environnement :

```bash
Name: VITE_API_URL
Value: https://learning-platform-api.onrender.com/api
```

**⚠️ Important :** Remplacez par votre vraie URL Render !

### 3.4 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Notez l'URL : `https://learning-platform-xxx.vercel.app`

### 3.5 Mettre à jour le CORS

Retournez sur Render et mettez à jour la variable :

```bash
CORS_ORIGIN=https://learning-platform-xxx.vercel.app
```

Puis **redémarrez** le service backend.

---

## ✅ Étape 4 : Tester (5 min)

### 4.1 Vérifier le Backend

Ouvrez : `https://votre-backend.onrender.com`

Vous devriez voir :
```json
{
  "message": "API Plateforme d'Apprentissage avec LLM",
  "version": "1.0.0",
  "endpoints": {...}
}
```

### 4.2 Vérifier le Frontend

Ouvrez : `https://votre-frontend.vercel.app`

1. La page d'accueil s'affiche ✅
2. Cliquez sur **"Cours"** ✅
3. Les cours PHP apparaissent ✅

### 4.3 Test Complet

1. Cliquez sur **"Connexion"**
2. Connectez-vous :
   ```
   Email: user@example.com
   Mot de passe: password123
   ```
3. Allez sur **"Dashboard"** ✅
4. Cliquez sur un cours PHP ✅
5. Ouvrez une leçon ✅
6. Passez un quiz ✅

**🎉 Si tout fonctionne, félicitations !**

---

## 🎯 URLs Finales

Notez vos URLs :

```
Frontend : https://learning-platform-xxx.vercel.app
Backend  : https://learning-platform-api.onrender.com
```

---

## 🐛 Problèmes Courants

### Erreur CORS

**Symptôme :** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution :**
1. Vérifiez la variable `CORS_ORIGIN` sur Render
2. Elle doit contenir l'URL exacte de Vercel
3. Redémarrez le service backend

### Backend qui ne démarre pas

**Symptôme :** "Application failed to respond"

**Solution :**
1. Vérifiez les logs sur Render
2. Assurez-vous que `package.json` est correct
3. Vérifiez que toutes les variables d'environnement sont définies

### "Cannot connect to backend"

**Symptôme :** Frontend affiche une erreur de connexion

**Solution :**
1. Vérifiez que `VITE_API_URL` est correct sur Vercel
2. Testez l'URL backend directement dans le navigateur
3. Attendez que Render sorte de veille (~30-60s)

### Base de données vide

**Symptôme :** Pas de cours affichés

**Solution :**
1. Connectez-vous au Shell Render
2. Exécutez :
   ```bash
   cd backend
   npm run init-db
   npm run seed
   npm run import-php
   ```

---

## 🔄 Redéploiement

### Frontend (Automatique)

À chaque `git push` sur la branche `main`, Vercel redéploie automatiquement.

### Backend (Automatique)

À chaque `git push` sur la branche `main`, Render redéploie automatiquement.

### Manuel

**Frontend :**
```bash
cd frontend
vercel --prod
```

**Backend :**
Via le dashboard Render : **"Manual Deploy"**

---

## 📊 Monitoring

### Vérifier l'état du Backend

```bash
curl https://votre-backend.onrender.com
```

### Logs en temps réel

**Render :**
Dashboard → Logs → Enable Auto-scroll

**Vercel :**
Dashboard → Deployments → View Function Logs

---

## 💡 Optimisations

### 1. Empêcher la Mise en Veille (Render)

Utilisez [UptimeRobot](https://uptimerobot.com) :
1. Créez un compte gratuit
2. Ajoutez un monitor HTTP(S)
3. URL : `https://votre-backend.onrender.com`
4. Intervalle : 5 minutes

### 2. Domaine Personnalisé

**Vercel :**
1. Settings → Domains
2. Ajoutez votre domaine (ex: `apprendre.monsite.com`)
3. Suivez les instructions DNS

**Render :**
1. Settings → Custom Domain
2. Ajoutez votre domaine (ex: `api.monsite.com`)

### 3. Variables d'Environnement de Production

Générez un JWT secret sécurisé :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Mettez à jour sur Render.

---

## 🎓 Prochaines Étapes

Maintenant que votre plateforme est en ligne :

1. **Testez toutes les fonctionnalités**
2. **Créez de nouveaux comptes utilisateurs**
3. **Ajoutez plus de cours** via `/admin`
4. **Partagez avec vos étudiants !**

---

## 📞 Support

**Problème de déploiement ?**

1. Consultez `docs/HEBERGEMENT.md` pour plus de détails
2. Vérifiez les logs (Render et Vercel)
3. Testez en local d'abord

**Erreurs courantes :**
- CORS : Mauvaise configuration de `CORS_ORIGIN`
- 500 : Vérifiez les variables d'environnement
- 404 : Mauvaise configuration de `VITE_API_URL`

---

## ✅ Checklist Finale

Avant de partager votre plateforme :

- [ ] Frontend accessible et rapide
- [ ] Backend répond (même après 15min)
- [ ] Connexion fonctionne
- [ ] Cours PHP visibles
- [ ] Leçons s'affichent correctement
- [ ] Quiz fonctionnent
- [ ] Badges s'attribuent
- [ ] Dashboard affiche les stats
- [ ] Design responsive (mobile)

---

**Félicitations ! Votre plateforme est en ligne ! 🎉**

Partagez l'URL : `https://votre-frontend.vercel.app`
