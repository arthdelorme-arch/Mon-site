PORTFOLIO — MISE À JOUR DEPUIS INDESIGN

Le document de travail est INDESIGN/Site_portfolio_Moodboards.indd : page 1 couverture, page 2 grille, pages 3 à 9 projets 1 à 7. L'aperçu local et la publication GitHub sont deux versions séparées.

GRILLE
La grille du site est une image de la page 2 dans grille/grille.jpg. Les sept vignettes mobiles sont des recadrages de cette même page, nommés grille/vignette-01.jpg à vignette-07.jpg. Après modification de la page 2 dans InDesign, il faut réexporter la page et régénérer ces images. Sur ordinateur, les zones cliquables sont positionnées dans portfolio.js ; si on déplace ou ajoute une vignette, il faut mettre à jour leur position et la liste projets.js. Les textes de la grille ordinateur font partie de l'image ; sur mobile ils sont créés par le site.

PROJETS ET MOODBOARDS
Les images moodboards/projet-01.jpg à projet-07.jpg sont les 1440 pixels de gauche des pages 3 à 9. Les textes sont dans descriptions-indesign.js. Les images individuelles converties pour le web sont dans images-moodboards ; les fichiers sources InDesign relevés sont listés dans INDESIGN/sources-moodboards.json. Après chaque modification, il faut actualiser les exports concernés et vérifier la liste et les descriptions ; cette synchronisation n'est pas automatique.

Le fichier projets.js contient les noms et les identifiants vidéo. Le carrousel affiche la vidéo si elle existe, puis le moodboard, puis les images individuelles. Les vidéos YouTube peuvent dépendre de leurs paramètres de partage et droits d'intégration.

COUVERTURE ET POLICE
La couverture actuelle provient de export-indesign/publication-web-resources/html/publication.html, un export antérieur de la page 1. Si la page 1 est modifiée dans InDesign, il faut actualiser son export. Les titres et les liens web utilisent le projet Adobe Fonts ech3qon, avec une police de secours si le service n'est pas disponible.

APERÇU ET PUBLICATION
Dans Terminal, ouvre ce dossier et lance : python3 -m http.server 8000
Ouvre http://localhost:8000 puis vérifie les projets, les vidéos, la fermeture et le mobile. Ctrl+C arrête le serveur.
La modification locale ne publie rien sur GitHub ; il faut comparer puis envoyer les fichiers ajoutés ou modifiés sur le dépôt.
