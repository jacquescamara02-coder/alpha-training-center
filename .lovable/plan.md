

## Plan : Galerie de Réalisations avec Lightbox

### Objectif
Ajouter une section "Galerie de Réalisations" entre les Services et les Avis Client, avec des photos catégorisées et un effet lightbox pour visualiser les images en plein écran.

### Structure

**1. Générer les images de la galerie (8-10 photos)**
Utiliser l'outil de génération d'images pour créer des visuels réalistes représentant les réalisations d'Alpha Training Center :
- 2-3 photos Construction (bâtiments, chantiers)
- 2 photos Formation (auto-école, soudure, couture)
- 2 photos Installation (électricité, courant)
- 2 photos Divers (transport, livraison matériaux)

Fichiers dans `src/assets/gallery/`.

**2. Créer le composant `GallerySection.tsx`**
- Système de filtres par catégorie (Tout, Construction, Formation, Installation, Divers) avec des boutons pilules
- Grille responsive masonry-like (2 colonnes mobile, 3 tablette, 4 desktop)
- Animation de reveal au scroll (IntersectionObserver, comme les autres sections)
- Hover effect : zoom léger + overlay avec icône "agrandir"

**3. Lightbox intégré**
- Dialog plein écran (utilisant le composant Dialog existant) avec fond sombre
- Navigation prev/next avec flèches et clavier
- Titre de la réalisation et catégorie affichés en overlay
- Animation d'ouverture/fermeture fluide
- Fermeture par clic sur l'overlay ou touche Escape

**4. Intégrer dans `Index.tsx`**
- Placer la section entre `ServicesSection` et `TestimonialsSection`

### Détails techniques
- Aucune dépendance supplémentaire requise — on utilise le Dialog Radix existant
- Filtrage par catégorie avec `useState` et transition CSS sur les items
- Pas de base de données nécessaire — les images sont statiques (assets)

