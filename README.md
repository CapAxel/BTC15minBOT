# Diagnostic & Territoire — Site vitrine

Site internet du bureau d'études **Diagnostic & Territoire**, spécialisé en
aménagement du territoire et urbanisme.

> Comprendre votre territoire. Éclairer vos décisions.

## Contenu

Site statique (HTML / CSS / JavaScript, sans dépendance ni étape de build) :

- `index.html` — page principale : héro, 4 pôles de services, approche, présentation du bureau, contact
- `mentions-legales.html` — mentions légales (à compléter : SIRET, hébergeur, etc.)
- `styles.css` — feuille de styles (responsive)
- `script.js` — menu mobile, animations d'apparition, formulaire de contact
- `favicon.svg` — favicon
- `brochure-offre-de-services.pdf` — brochure téléchargeable depuis le site

## Lancer le site en local

Aucune installation nécessaire : ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mise en ligne

Le site étant 100 % statique, il peut être hébergé gratuitement sur GitHub Pages,
Netlify, Cloudflare Pages, etc. Pour GitHub Pages : Settings → Pages → déployer
depuis la branche souhaitée (racine).

## À personnaliser

- L'adresse de contact `contact@diagnostic-territoire.fr` (dans `index.html`,
  `script.js` et `mentions-legales.html`) — remplacer par l'adresse réelle.
- Le formulaire ouvre le client de messagerie du visiteur (`mailto:`). Pour un
  envoi direct sans client mail, brancher un service comme Formspree dans `script.js`.
- Les mentions légales (forme juridique, SIRET, hébergeur…).
