# Utiliser une image Node.js officielle comme base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production=false

# Copier tout le code source
COPY . .

# Exposer le port 4200 (port par défaut d'Angular)
EXPOSE 4200

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "ng", "serve", "--", "--host", "0.0.0.0", "--port", "4200"]
