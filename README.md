PathSense est une application de navigation vocale destinée à faciliter les déplacements pour les  non voyant. 
L’utilisateur peut rechercher une destination par voix ou clavier, visualiser son itinéraire sur une carte et recevoir des instructions guidées étape par étape. 

Le projet repose sur une architecture moderne : 

Frontend : Angular (Standalone Components,SpeechRecognitio 

) 

Backend : FastAPI (Python) 

Base de données : PostgreSQL 

Cartographie : OpenStreetMap (Leaflet) 

 

Architecture technique 

 

GROUPE_GAMMA 

├── frontend (Angular) 

└── backend  (FastAPI + PostgreSQL) 

 

Frontend Angular 

Le frontend gère : 

Interface utilisateur 

Navigation entre pages 

Reconnaissance vocale 

Affichage carte OpenStreetMap 

Roadbook audio 

 

Pages Principales 

 

Page 

Rôle 

Home 

Accueil 

Listening 

Capture vocale 

Navigation 

Carte + instructions 

Roadbook 

Lecture audio des étapes 

 

Backend FastAPI 

Le backend gère : 

Réception des destinations 

Calcul d’itinéraire (Dijkstra) 

Accès base PostgreSQL 

Envoi des étapes vers Angular 

Route Principale : POST /route 

 

Base de données  

Tables principales  

Table 

Rôle 

locations 

Lieux géographiques 

nodes 

Points du graphe 

edges 

Connexions entre points 

pois 

Points d’intérêt 

route_steps 

Étapes d’itinéraire 

 

 

Navigation vocale 

Fichier : 

components/listening/listening.ts 

Code clé : 

this.router.navigate(['/navigation'], { 
 queryParams: { destination: this.transcript } 
}); 

 

Affichage de la carte 

Fichier : 

components/navigation/navigation.ts 

Carte créée avec Leaflet : 

this.map = L.map('map').setView([48.8566, 2.3522], 18); 

Tile OpenStreetMap : 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') 

 

 

Communication Backend 

Toujours dans navigation.ts : 

this.navigationService.getRoute(this.destination) 

Le backend renvoie : 

steps[] 

distance 

instruction 

icône 

 

 

Roadbook vocal 

Fichier : 

components/roadbook/roadbook.ts 

Lecture audio : 

speechSynthesis.speak(new SpeechSynthesisUtterance(text)); 

 

 

Technologies utilisées : 

Material Icons 

Google Fonts 

CSS standalone par composant 

 

Déploiement 

Plateforme choisie : 

Render 

Pourquoi ? 

Support Angular 

Support FastAPI 

Base PostgreSQL intégrée 

Déploiement mono-repository 

 

Fonctionnalités principales 

-Navigation vocale 
- Recherche clavier 
-Carte OpenStreetMap 
-Roadbook audio 
-Instructions dynamiques 
-Navigation entre pages Angular 

 

Contenu marketing 

Concept 

PathSense propose une navigation intelligente basée sur la voix pour simplifier les déplacements urbains. 

Points forts 
