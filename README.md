# Topia Holdings Website

This is a temporary repo for **Topia Holdings**.

## Live Demo
This is the link for live demo: [Demo](https://topiatesting.netlify.app/)


## Links to Design and other Document

- [Proposal](https://docs.google.com/document/d/1dUD0WFzXsvOnbsH13G8qDuoJL-fIMKOcyPaFwkr7WSo/edit?tab=t.0)

- [Personal Note](https://docs.google.com/document/d/1w_TVQiAnOO1CHILcSB-cUACBN_bCcPEi4IiyU3tkPYw/edit?tab=t.0)

- [Bussiness Plan](https://docs.google.com/document/d/1SsibP3C9ZL2qjEIa9D_OOkcXQWSBJxwo/edit)

- [Figma Design](https://www.figma.com/design/fix9T646Mj00I2y2FN1A4C/Topia?node-id=0-1&p=f&t=O5TswnBeueskLiml-0)

- [Initial Design Slides](https://docs.google.com/presentation/d/1dSmG9K4_hFH7ExTpLfCSpVaZzcG1rSLRYhLZoslGJUI/edit?usp=sharing)

## Project Structure

Inside of the project, you'll see the following folders and files:

```text
/
├── public/                         # static resource (picture...)
│   └── images/
│       └── placeholder/            
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # backbone (html/head/body/slot)
│   ├── pages/
│   │   └── index.astro             # homepage
│   ├── components/
│   │   ├── common/                 # common components
│   │   │   ├── Container.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── nav/                    # navigation - header and footer
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── home/                   # homepage components
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Values.tsx
│   │       ├── Services.tsx
│   │       ├── Partnership.tsx
│   │       └── ContactTeaser.tsx
│   ├── content/                    # content files
│   │   ├── site.ts                 # company info
│   │   ├── services.ts             # service info
│   │   └── partnership.ts          # partnership info
│   └── styles/
│       └── globals.css             # Tailwind 全域樣式
├── astro.config.mjs
├── tailwind.config.cjs
├── postcss.config.cjs
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
