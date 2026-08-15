# Portfolio — Ahmad Bouhmouch

Site portfolio d'architecture, bilingue **français / anglais**.
HTML, CSS et JavaScript purs — **aucune dépendance, aucun build**.

---

## Mise en ligne (GitHub Pages)

1. Copier tout le contenu de ce dossier à la racine du dépôt
   `Ahmad-BOUHMOUCH.github.io` (en remplaçant l'ancien site React).
2. `git add . && git commit -m "Nouveau portfolio" && git push`
3. Dans **Settings → Pages** du dépôt : source = branche `main`, dossier `/ (root)`.

### Domaine `AhmadBouhmouch.com`

Le fichier `CNAME` est déjà présent. Côté registrar, créer :

| Type  | Nom   | Valeur                  |
|-------|-------|-------------------------|
| A     | `@`   | `185.199.108.153`       |
| A     | `@`   | `185.199.109.153`       |
| A     | `@`   | `185.199.110.153`       |
| A     | `@`   | `185.199.111.153`       |
| CNAME | `www` | `ahmad-bouhmouch.github.io.` |

Puis, dans **Settings → Pages**, cocher **Enforce HTTPS** (disponible après
propagation DNS, de quelques minutes à 24 h).

---

## Ajouter un projet (ex. le PFE)

Tout se passe dans **un seul fichier** : `js/projects.js`.

1. Créer le dossier `assets/projects/mon-projet/` et y déposer les images.
2. Ouvrir `js/projects.js` et ajouter un bloc au tableau `PROJECTS` :

```js
{
  slug: 'mon-projet',                     // = nom du dossier
  year: '2026',
  title:    { fr: 'Titre français',  en: 'English title' },
  type:     { fr: 'Programme',       en: 'Programme' },
  location: { fr: 'Ville, Pays',     en: 'City, Country' },
  description: {
    fr: ["Premier paragraphe.", "Deuxième paragraphe."],
    en: ["First paragraph.", "Second paragraph."]
  },
  images: [
    { file: 'vue-principale.jpg', w: 2200, h: 1238,
      alt: { fr: 'Vue principale', en: 'Main view' } }
  ]
}
```

- L'**ordre du tableau** définit l'ordre d'affichage sur le site.
  Pour mettre le PFE en tête, placer son bloc en premier.
- La **première image** sert de vignette dans la grille.
- `w` et `h` sont les dimensions réelles en pixels : elles réservent l'espace
  et évitent que la page « saute » pendant le chargement.

### Poids des images

Viser **2200 px de large maximum** et **moins de 500 Ko** par image
(les plans et coupes : 1800 px suffisent).

---

## Modifier un texte

Tous les textes du site sont dans `js/i18n.js`, en `fr` et `en`.
Changer la valeur suffit — ni le HTML ni le CSS ne sont à toucher.

## Ajouter le CV en français

1. Déposer le fichier dans `assets/cv/Ahmad-BOUHMOUCH-CV-FR.pdf`
2. Dans `js/main.js`, chercher `HAS_FR_CV` et passer la valeur à `true`.

Le bouton de téléchargement servira alors automatiquement la version
correspondant à la langue affichée.

> **À noter :** le CV anglais actuel indique « 6th year of architecture
> studies » et « seeking a position », alors que le site annonce un
> architecte diplômé. Il gagnerait à être mis à jour.

---

## Structure

```
index.html            Page unique (à propos, parcours, projets, contact)
css/style.css         Toute la mise en forme
js/i18n.js            Textes FR / EN
js/projects.js        Données des projets  ← à éditer pour ajouter un projet
js/main.js            Langue, rendu, navigation, carrousel
assets/
  projects/<slug>/    Images par projet
  profile/            Portrait
  fonts/              Cormorant Garamond + Inter (locales, pas de CDN)
  cv/                 CV en PDF
  icons/              Logo, favicon et icônes de contact
CNAME, robots.txt, sitemap.xml
```

## Logo & favicon

Le logo AB existe en deux versions dans `assets/icons/` :

| Fichier             | Usage                                              |
|---------------------|----------------------------------------------------|
| `logo-AB.png`       | Logo complet (cercle + AB + « ARCHITECTE »)        |
| `logo-AB-mark.png`  | Monogramme seul — utilisé dans la barre et le favicon |
| `favicon.ico`       | Favicon multi-tailles (16 → 256 px)                |
| `apple-touch-icon.png` | Icône iOS 180 px, fond crème opaque             |

Le mot « ARCHITECTE » devient illisible en dessous de 48 px : la barre de
navigation et le favicon utilisent donc le monogramme seul. Le logo complet
reste disponible pour tout usage en grand format (papeterie, signature).

Pour régénérer ces fichiers depuis un nouveau logo, le fond blanc doit être
rendu transparent — sans quoi un carré blanc apparaîtrait sur le fond crème
du site.

## Choix techniques

- **Langue** : français si le navigateur est francophone ou si le fuseau
  horaire correspond à un pays francophone (Maroc inclus) ; anglais sinon.
  Le choix manuel est mémorisé dans le navigateur.
- **Barre de navigation** : toujours visible (sticky), jamais masquée au
  défilement. Sur mobile, le menu s'ouvre en panneau plein écran opaque.
- **Cartes projet** : cadre, numéro, pastille d'agrandissement, mention
  « Voir le projet » et nombre de vues — l'affordance de clic est visible
  en permanence, y compris sur mobile où il n'y a pas de survol.
- **Carrousel mobile** : les images voisines dépassent d'environ 7 % de
  chaque côté, pour indiquer clairement que la galerie se fait glisser.
- **Accessibilité** : navigation clavier complète (←/→/Échap/Home/End),
  focus maintenu dans la visionneuse, contrastes conformes WCAG AA,
  animations désactivées si le système le demande.

## Développement local

```bash
python -m http.server 8000
```
puis ouvrir `http://localhost:8000`.
(Ouvrir `index.html` directement en `file://` empêche le chargement des polices.)
