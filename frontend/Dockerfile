# Dockerfile pour le frontend React
# Build multi-stage pour optimiser la taille de l'image

# Stage 1: Build de l'application React
FROM node:18-alpine AS builder

# Métadonnées
LABEL maintainer="Excel AI Editor Team"
LABEL description="Frontend React pour l'édition de fichiers Excel avec IA"

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ENV REACT_APP_API_URL=http://localhost:5000/api
ENV GENERATE_SOURCEMAP=false

# Build de l'application
RUN npm run build

# Stage 2: Serveur Nginx pour servir l'application
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=builder /app/build /usr/share/nginx/html

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Exposer le port
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
