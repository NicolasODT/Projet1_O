# Application des Jeux Olympiques

Ce projet est une application web développée avec Angular qui affiche les données des participations aux Jeux Olympiques par pays. L'application permet de visualiser des statistiques globales et détaillées sous forme de graphiques interactifs.

## 🌟 Fonctionnalités

* **Page d'accueil :**
  * Affiche des statistiques générales : le nombre de Jeux Olympiques et le nombre de pays participants.
  * Présente un graphique circulaire (`pie-chart`) montrant le nombre total de médailles pour chaque pays.
  * La navigation vers la page de détail se fait en cliquant sur un pays dans le graphique.

* **Page de détail :**
  * Affiche le nom du pays sélectionné.
  * Présente des statistiques spécifiques au pays : nombre de participations, nombre total de médailles et nombre total d'athlètes.
  * Un graphique en ligne (`line-chart`) illustre l'évolution du nombre de médailles au fil des ans pour ce pays.
  * Un bouton permet de revenir facilement à la page d'accueil.

* **Navigation :**
  * Utilise le routeur d'Angular pour gérer la navigation entre les pages.
  * Une page `NotFound` est affichée pour toute URL invalide.

## 🛠️ Technologies et Librairies

* **Framework :** Angular
* **Langage :** TypeScript
* **Styles :** SCSS
* **Graphiques :** `ngx-charts`
* **Asynchrone :** RxJS (Observables)
* **Client HTTP :** HttpClientModule pour charger les données depuis un fichier JSON.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre machine :
* Node.js (v16.x ou plus récent)
* Angular CLI (`npm install -g @angular/cli`)

## 🚀 Installation et Lancement

1.  **Clonez le dépôt de code source :**
    ```bash
    git clone [https://github.com/votre-utilisateur/votre-repo.git](https://github.com/votre-utilisateur/votre-repo.git)
    ```

2.  **Naviguez jusqu'au répertoire du projet :**
    ```bash
    cd nom-du-projet
    ```

3.  **Installez les dépendances du projet :**
    ```bash
    npm install
    ```

4.  **Lancez l'application en mode développement :**
    ```bash
    ng serve
    ```

5.  **Ouvrez votre navigateur :**
    Rendez-vous sur `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

## 📂 Structure du projet

Le projet est organisé de la manière suivante pour séparer les responsabilités :

Voici le contenu du fichier README.md que vous pouvez copier-coller directement dans votre projet.

Markdown

# Application des Jeux Olympiques

Ce projet est une application web développée avec Angular qui affiche les données des participations aux Jeux Olympiques par pays. L'application permet de visualiser des statistiques globales et détaillées sous forme de graphiques interactifs.

## 🌟 Fonctionnalités

* **Page d'accueil :**
  * Affiche des statistiques générales : le nombre de Jeux Olympiques et le nombre de pays participants.
  * Présente un graphique circulaire (`pie-chart`) montrant le nombre total de médailles pour chaque pays.
  * La navigation vers la page de détail se fait en cliquant sur un pays dans le graphique.

* **Page de détail :**
  * Affiche le nom du pays sélectionné.
  * Présente des statistiques spécifiques au pays : nombre de participations, nombre total de médailles et nombre total d'athlètes.
  * Un graphique en ligne (`line-chart`) illustre l'évolution du nombre de médailles au fil des ans pour ce pays.
  * Un bouton permet de revenir facilement à la page d'accueil.

* **Navigation :**
  * Utilise le routeur d'Angular pour gérer la navigation entre les pages.
  * Une page `NotFound` est affichée pour toute URL invalide.

## 🛠️ Technologies et Librairies

* **Framework :** Angular
* **Langage :** TypeScript
* **Styles :** SCSS
* **Graphiques :** `ngx-charts`
* **Asynchrone :** RxJS (Observables)
* **Client HTTP :** HttpClientModule pour charger les données depuis un fichier JSON.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les logiciels suivants sur votre machine :
* Node.js (v16.x ou plus récent)
* Angular CLI (`npm install -g @angular/cli`)

## 🚀 Installation et Lancement

1.  **Clonez le dépôt de code source :**
    ```bash
    git clone [https://github.com/NicolasODT/Projet1_O](https://github.com/NicolasODT/Projet1_O)
    ```

2.  **Naviguez jusqu'au répertoire du projet :**
    ```bash
    cd nom-du-projet
    ```

3.  **Installez les dépendances du projet :**
    ```bash
    npm install
    ```

4.  **Lancez l'application en mode développement :**
    ```bash
    ng serve
    ```

5.  **Ouvrez votre navigateur :**
    Rendez-vous sur `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

## 📂 Structure du projet

Le projet est organisé de la manière suivante pour séparer les responsabilités :

src/
├── app/
│   ├── core/
│   │   ├── models/         # Interfaces (Olympic, Participation)
│   │   └── services/       # Services (OlympicService pour la gestion des données)
│   │
│   ├── pages/
│   │   ├── detail/         # Page de détail d'un pays
│   │   ├── home/           # Page d'accueil
│   │   └── not-found/      # Page 404
│   │
│   ├── app-routing.module.ts # Configuration des routes
│   ├── app.component.ts      # Composant racine
│   └── app.module.ts         # Module principal de l'application
│
├── assets/
│   └── mock/
│       └── olympic.json    # Fichier de données JSON
│
└── environments/           # Fichiers d'environnement (dev/prod)
