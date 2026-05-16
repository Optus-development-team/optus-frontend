# OPTUS UI Kit

This UI kit packages the core OPTUS visual language so another repo can reproduce the same look with minimal work.

How to use
1. Copy the entire `optus-ui-kit` folder into the target repository (for example `src/ui-kit`).
2. Ensure the target project has React and can import CSS.
3. Add the same fonts and icons used by OPTUS if you want the full visual match. The source project loads them from `index.html`.
4. Import the kit CSS once in your app root:

```js
import './ui-kit/variables.css';
import './ui-kit/base.css';
import './ui-kit/layout.css';
import './ui-kit/utilities.css';
import './ui-kit/animations.css';
import './ui-kit/theme.css';
import './ui-kit/buttons.css';
import './ui-kit/cards.css';
```

5. Use components:

```jsx
import React from 'react';
import { Button, Flashcard, Card, SectionHeader } from './ui-kit';

export default function Demo() {
  return (
    <div>
      <SectionHeader
        eyebrow="OPTUS"
        title="Diseño reutilizable"
        subtitle="Componentes y estilos listos para otra app"
      />
      <Button variant="primary">Chatea con Nosotros</Button>
      <Flashcard title="Cobros" stat="60%" description="Reduce tiempos de cobro" />
      <Card>
        <p>Card base reusable</p>
      </Card>
    </div>
  );
}
```

Notes
- The kit uses CSS custom properties from `variables.css`; adapt those tokens first if the brand changes.
- Most layout and spacing is class-based, so you can reuse the same JSX structure in a new repo.
- The components are intentionally small and dependency-free apart from React and optional Font Awesome icons.

## Files To Copy First

- `variables.css`
- `base.css`
- `layout.css`
- `utilities.css`
- `animations.css`
- `theme.css`
- `buttons.css`
- `cards.css`
- `Button.jsx`
- `Flashcard.jsx`
- `Card.jsx`
- `SectionHeader.jsx`
- `index.js`

## What This Kit Covers

- Base colors, spacing, radius, shadows, typography
- Global resets and body theme behavior
- Buttons, link buttons, icon buttons, CTA buttons
- Generic cards, stats cards, pricing cards, feature cards, flashcards
- Section headers, grids, containers, surfaces, page shells
- Utility classes and animation helpers

## What You Still Need In Another Repo

- Copy the project logo and any used images
- Add the same fonts and Font Awesome links
- Add a theme toggle if you want the same light/dark behavior
- Keep your translated copy in a locale system if you need bilingual UI