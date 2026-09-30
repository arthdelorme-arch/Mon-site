PORTFOLIO — WORKFLOW IN DESIGN

MODIFIER UNE PAGE
1. Modifie la page dans InDesign.
2. Réexporte ton document en HTML5.
3. Remplace les fichiers exportés InDesign correspondants dans publication-web-resources/html/ et publication-web-resources/image/.
4. Ne touche pas à index.html, main.css ou main.js.

AJOUTER UNE PAGE
1. Exporte la nouvelle page depuis InDesign.
2. Copie son HTML dans publication-web-resources/html/.
3. Ouvre publication-web-resources/script/main.js.
4. Ajoute le nom du nouveau fichier dans le tableau pages.

MODIFIER OU AJOUTER DES VIDEOS YOUTUBE
1. Ouvre publication-web-resources/script/main.js.
2. Modifie la liste videoUrls : ajoute une URL YouTube entre guillemets, une par ligne.
3. Les liens youtube.com/watch?v=..., youtu.be/... et youtube.com/embed/... sont acceptes.
4. Dans le tableau pages, deplace la ligne { videoUrl: getYouTubeEmbedUrl(videoUrls[0]) } a l'endroit souhaite.
5. Pour chaque URL ajoutee a videoUrls, ajoute une ligne video correspondante dans pages; deplace cette ligne pour regler sa position.

IMPORTANT
Le site adapte automatiquement les pages InDesign 1920x1080 à la fenêtre du navigateur et les affiche en scroll vertical, une page par écran.
