# Snippix

<p align="center">
  <img src="./snippix-ensemble-mockup.png" alt="Snippix app preview" width="900" />
</p>

<p align="center">
  <strong>A fast, keyboard-first snippet manager for developers.</strong>
</p>

<p align="center">
  Save, search, organize, and reuse your code snippets without breaking flow.
</p>

<p align="center">
  <a href="https://snippix.zayeef.dev">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=00FF41" alt="Live Demo" />
  </a>
  <a href="https://github.com/zayeefzahid/snippix">
    <img src="https://img.shields.io/badge/Repository-000000?style=for-the-badge&logo=github&logoColor=00FF41" alt="Repository" />
  </a>
  <a href="https://github.com/zayeefzahid/snippix/issues">
    <img src="https://img.shields.io/badge/Issues-000000?style=for-the-badge&logo=github&logoColor=00FF41" alt="Issues" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-0A0A0A?style=flat-square&logo=typescript&logoColor=00FF41" />
  <img src="https://img.shields.io/badge/React-0A0A0A?style=flat-square&logo=react&logoColor=00FF41" />
  <img src="https://img.shields.io/badge/Vite-0A0A0A?style=flat-square&logo=vite&logoColor=00FF41" />
  <img src="https://img.shields.io/badge/Node.js-0A0A0A?style=flat-square&logo=node.js&logoColor=00FF41" />
  <img src="https://img.shields.io/badge/Express-0A0A0A?style=flat-square&logo=express&logoColor=00FF41" />
</p>

---

## `> overview`

Snippix is a keyboard-first snippet manager built for developers who constantly reuse code, commands, configs, notes, and small patterns.

Instead of digging through old projects, Notion pages, random files, or browser bookmarks, Snippix gives you one focused place to store and quickly retrieve your most useful snippets.

```bash
save snippet → tag it → search instantly → copy → keep building
```

---

## `> features`

- **Quick snippet capture**  
  Save snippets with a title, language, tags, description, and code body.

- **Fast search and filtering**  
  Search by title, language, tags, or content to find snippets quickly.

- **Syntax highlighting**  
  Read and reuse snippets with clean language-aware formatting.

- **Copy to clipboard**  
  Copy snippets instantly without selecting text manually.

- **Keyboard-first workflow**  
  Navigate, search, create, edit, and copy with shortcuts.

- **Import and export**  
  Move snippets in and out using JSON.

- **Dark mode**  
  Built with a clean developer-focused interface.

- **Share-ready structure**  
  Designed with future support for private snippets, accounts, and shareable links.

---

## `> why_snippix`

Developers reuse small pieces of code every day:

- API request templates
- terminal commands
- CSS utilities
- config files
- React components
- regex patterns
- database queries
- deployment notes

Snippix keeps those reusable pieces organized, searchable, and ready to paste when you need them.

---

## `> tech_stack`

| Layer | Tech |
|---|---|
| Language | TypeScript |
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Package Manager | pnpm |
| Shared Code | TypeScript types and utilities |
| Formatting | Prettier |

---

## `> project_structure`

```txt
.
├── client/            # Frontend app
├── server/            # Backend API
├── shared/            # Shared types and utilities
├── package.json       # Root scripts and workspace config
├── pnpm-lock.yaml
├── tsconfig*.json
├── vite.config.ts
└── README.md
```

---

## `> getting_started`

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- pnpm 9+

### Clone the repository

```bash
git clone https://github.com/zayeefzahid/snippix.git
cd snippix
```

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5175
NODE_ENV=development
VITE_API_URL=http://localhost:5175
```

If you add a database later, you can include:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/snippix
```

### Start the development server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Format code

```bash
pnpm format
```

---

## `> api_preview`

Snippix is structured around a simple snippets API.

```txt
GET     /api/snippets          # Get all snippets
POST    /api/snippets          # Create a snippet
GET     /api/snippets/:id      # Get one snippet
PATCH   /api/snippets/:id      # Update a snippet
DELETE  /api/snippets/:id      # Delete a snippet
```

### Snippet model

```ts
type Snippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  notes?: string;
  visibility: "private" | "public";
  createdAt: string;
  updatedAt: string;
};
```

---

## `> keyboard_shortcuts`

| Shortcut | Action |
|---|---|
| `/` | Focus search |
| `n` | Create new snippet |
| `e` | Edit selected snippet |
| `Enter` | Copy selected snippet |
| `Esc` | Close modal or dialog |

---

## `> screenshots`

<p align="center">
  <img src="./snippix-ensemble-mockup.png" alt="Snippix preview" width="900" />
</p>

<p align="center">
  <em>Keyboard-first snippet manager with a clean developer workflow.</em>
</p>

---

## `> roadmap`

- [ ] User authentication
- [ ] Private snippets
- [ ] Shareable snippet links
- [ ] Cloud sync
- [ ] Gist import/export
- [ ] VS Code extension
- [ ] Browser extension
- [ ] Team workspaces
- [ ] Advanced fuzzy search
- [ ] Snippet collections

---

## `> deployment`

Recommended deployment setup:

| Part | Platform |
|---|---|
| Frontend | Vercel, Netlify, or Cloudflare Pages |
| Backend | Render, Railway, or Fly.io |
| Database | PostgreSQL, MongoDB, or SQLite |

Environment variables should be configured on the hosting platform before deployment.

---

## `> contributing`

Contributions are welcome.

To contribute:

```bash
git checkout -b feat/your-feature
git commit -m "feat: add your feature"
git push origin feat/your-feature
```

Then open a pull request.

For major changes, please open an issue first so the idea can be discussed.

---

## `> license`

MIT © 2025 Zayeef Zahid

---

## `> links`

- **Live Demo:** [snippix.zayeef.dev](https://snippix.zayeef.dev)
- **Repository:** [github.com/zayeefzahid/snippix](https://github.com/zayeefzahid/snippix)
- **Issues:** [github.com/zayeefzahid/snippix/issues](https://github.com/zayeefzahid/snippix/issues)

---

<p align="center">
  <strong>Built for developers who reuse code faster than they can remember where they saved it.</strong>
</p>
