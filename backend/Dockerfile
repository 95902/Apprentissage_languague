# Utiliser l'image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste des fichiers
COPY . .

# Créer le dossier pour la base de données
RUN mkdir -p /app/data

# Initialiser la base de données
RUN npm run init-db

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/learning_platform.db

# Commande de démarrage
CMD ["npm", "start"]
