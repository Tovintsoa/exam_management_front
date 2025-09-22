# Projet Angular avec API et Docker

Ce projet utilise Angular côté front et une API côté serveur. La configuration est basée sur Docker pour faciliter le déploiement et l'exécution.
## 📋 Table des matières
## 🚀 Technologies utilisées
  - **Angular**

## Prérequis
- Windows 11 avec WSL2 activé
- Ubuntu installé via WSL2
- Docker Desktop for Windows
- Docker Compose

## Installation et lancement
### 1. Configuration de l'environnement
  Assurez-vous que Docker Desktop est installé avec l'intégration WSL2 activée :
    1. Ouvrez Docker Desktop
    2. Allez dans **Settings** > **Resources** > **WSL Integration**
    3. Cochez la case pour votre distribution Ubuntu

### 2. Clonage du projet
  ```bash
    git clone https://github.com/Tovintsoa/exam_management_front.git
    cd exam_management_front
  ```
### 3. Construction et démarrage des services

  ```bash
  # Construction des images Docker
  docker compose build --no-cache
  
  # Démarrage de tous les services
  docker compose up -d
  ```


4. **Connexion**

    Email : tianatovintsoa@gmail.com

    Mot de passe : tovintsoa

