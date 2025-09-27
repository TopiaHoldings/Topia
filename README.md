# Topia Holdings Website

This is a repo for **Topia Holdings**.
[![Netlify Status](https://api.netlify.com/api/v1/badges/35da72d8-a2eb-4bae-bb17-87d5f491196e/deploy-status)](https://app.netlify.com/projects/topiaholdings/deploys)

## Project Structure

Inside of the project, you'll see the following folders and files:

```text
/
├── public/                         # static resource (picture...)
│   └── images/
│                   
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # backbone (html/head/body/slot)
│   ├── pages/
│   │   └── index.astro             # homepage
│   ├── components/
│   │   ├── common/                 # common components
│   │   │   ├── Container.tsx
│   │   │   ...
│   │   ├── nav/                    # navigation - header and footer
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── home/                   # homepage components
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ...
│   ├── content/                    # content files
│   │   ├── site.ts                 # company info
│   │   ├── services.ts             # service info
│   │   └── partnership.ts          # partnership info
│   └── styles/
│       └── globals.css             
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Installation & Deployment




## Tech Stack
Astro + React + TypeScript + Tailwind CSS + HTML

### Package used
react-icons
lucide-react

## Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
