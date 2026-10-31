PORTFOLIO — ACTUALISER LE SITE

1. Enregistre tes modifications dans InDesign et vérifie dans Liens qu'il ne manque aucune image.
2. Exporte le document complet avec Fichier > Exporter > HTML5 dans un nouveau dossier, séparé de « Main structure ».
3. Ouvre Terminal. Écris python3 suivi d'un espace, puis glisse le fichier actualiser.py dans Terminal. Ajoute un espace et glisse le dossier exporté (celui qui contient publication-web-resources). Appuie sur Entrée.

Exemple pour l'export local actuel :
python3 "Main structure/actualiser.py" "Site_portfolio"
(cet exemple suppose que Terminal est ouvert dans le dossier parent de Main structure)

L'import vérifie la numérotation et les références locales des pages avant de remplacer l'export du site. Il met à jour automatiquement leur nombre et leur ordre. Il ne peut pas garantir qu'InDesign a correctement exporté une image dont le lien source est manquant.

4. Vérifie le résultat en ouvrant Main structure/index.html dans un navigateur, notamment les images, les textes et les vidéos. Pour un aperçu par serveur local, dans Terminal :
cd "chemin/vers/Main structure"
python3 -m http.server 8000
Puis ouvre http://localhost:8000. Arrête le serveur avec Ctrl+C.
5. Publie ensuite le contenu de Main structure sur le dépôt GitHub qui héberge le site. L'import local ne publie rien automatiquement.

VIDÉOS
Ouvre videos.js avec un éditeur de texte. Chaque ligne contient l'URL et apresPage : le numéro de la page InDesign après laquelle placer la vidéo, couverture comprise. Plusieurs vidéos peuvent suivre une même page, dans leur ordre dans le fichier. Tu peux utiliser une URL YouTube classique, youtu.be ou embed.

Si tu ajoutes, supprimes ou réorganises des pages dans InDesign, vérifie les numéros apresPage : les vidéos suivent les numéros, pas les titres des projets. Une vidéo placée après un numéro de page inexistant ne sera pas affichée.

Ne modifie pas pages-indesign.js : il est régénéré par actualiser.py. L'ancienne page-7-export et les anciennes ressources sont conservées comme archives ; le site utilise export-indesign.
