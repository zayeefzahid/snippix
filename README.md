# Snippix

*A fast, keyboard‑first place to save, search, and share code snippets.*

> **TL;DR**: Snippix lets you capture reusable code, tag it, and paste it anywhere—without leaving the keyboard.

<p align="center">
  <a href="https://snippix.zayeef.dev">Demo</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-project-structure">Project Structure</a> ·
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🎥 Demo

<p align="center">
  <img src="./preview.png" alt="Snippix demo" width="900"/>
</p>

---

## ✨ Features

* **Quick capture**: add a snippet with title, language, tags, and description.
* **Search & filter**: fuzzy search, tag filters, language filters.
* **Syntax highlight** with copy‑to‑clipboard.
* **Keyboard shortcuts** for add, search, edit, and copy actions.
* **Import/Export** snippets as JSON.
* **Accounts** (optional): sign in, private snippets, share links.
* **Dark mode** out of the box.

---

## 🧱 Tech Stack


* **Language:** TypeScript
* **Package manager:** pnpm
* **Client:** Vite + React (TS), CSS
* **Server:** Node.js + Express (TS) *(update if you use another framework)*
* **Shared:** TypeScript types & utilities in `/shared`
* **Formatting:** Prettier

---

## 📦 Project Structure

```
.
├── client/            # Frontend app (React + Vite)
├── server/            # Backend API (Node/Express)
├── shared/            # Shared types & helpers
├── package.json       # Root scripts & workspaces
├── pnpm-lock.yaml
├── tsconfig*.json
├── vite.config.ts     # Vite config (client)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* pnpm 9+
* (Optional) PostgreSQL if you use a DB

### 1) Clone

```bash
git clone https://github.com/zayeefzahid/snippix.git
cd snippix
```

### 2) Install

```bash
pnpm install
```

### 3) Environment

Create a `.env` in the project root (and/or inside `client/` and `server/` if you keep them separate). Example:

```bash
# Server
PORT=5175
NODE_ENV=development
# DB (if applicable)
DATABASE_URL=postgresql://user:password@localhost:5432/snippix

# Client
VITE_API_URL=http://localhost:5175
```

### 4) Develop

From the repo root:

```bash
# start both client & server in dev (update with your scripts)
pnpm dev
```

If you split scripts per package:

```bash
# in one terminal
cd server && pnpm dev
# in another
cd client && pnpm dev
```

### 5) Build

```bash
pnpm build
```

### 6) Lint & Format

```bash
pnpm lint
pnpm format
```

> Update script names in `package.json` as needed.

---

## 🔌 API (sketch)

> Keep this section in sync with your actual endpoints.

```
GET    /api/snippets           # list (q, tag, lang)
POST   /api/snippets           # create
GET    /api/snippets/:id       # read
PATCH  /api/snippets/:id       # update
DELETE /api/snippets/:id       # delete
```

### Snippet Object

```ts
{
  id: string;
  title: string;
  code: string;
  language: string;  // e.g., "ts", "js", "py"
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  ownerId?: string;  // if accounts are enabled
  visibility: 'private' | 'public';
}
```

---

## 🎹 Keyboard Shortcuts (example)

* `n` — new snippet
* `/` — focus search
* `e` — edit selected
* `Enter` — copy
* `Esc` — close dialog

---

## 🖼️ Screenshots

> Drop a couple of screenshots or a short GIF here.

```
./client/public/screenshot-01.png
./client/public/screenshot-02.png
```

---

## 🧪 Tests

```bash
pnpm test
```

*If you don't have tests yet, remove this section or add a TODO.*

---

## 🗺️ Roadmap

* [ ] Auth (email/password or OAuth)
* [ ] Cloud sync & shareable links
* [ ] VS Code extension / browser extension
* [ ] Import from Gist / export to Gist
* [ ] Org/team workspaces

---

## 🛠️ Local Development Tips

* Use `.env.local` for developer‑specific overrides.
* Keep reusable types in `/shared` to avoid drift between client/server.
* Prefer optimistic UI updates with background sync.

---

## 🧰 Scripts (example)

*Add/adjust these in your root `package.json`*

```jsonc
{
  "scripts": {
    "dev": "concurrently -n client,server -c auto 'pnpm --filter client dev' 'pnpm --filter server dev'",
    "build": "pnpm -r build",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "workspaces": ["client", "server", "shared"]
}
```

---

## 📦 Deployment

* **Frontend**: Vercel/Netlify/Cloudflare Pages
* **Backend**: Render/Fly.io/Railway
* Add `CORS` and set `VITE_API_URL` accordingly.

---

## 🤝 Contributing

Pull requests welcome. For major changes, please open an issue first to discuss what you’d like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/awesome`
3. Commit: `git commit -m "feat: add awesome"`
4. Push: `git push origin feat/awesome`
5. Open a PR

---

## 📄 License

MIT © 2025 Zayeef Zahid

---

## 📎 Links

* Repository: [https://github.com/zayeefzahid/snippix](https://github.com/zayeefzahid/snippix)
* Issues: [https://github.com/zayeefzahid/snippix/issues](https://github.com/zayeefzahid/snippix/issues)
* (Optional) Live demo: <add link>

---

### Notes for Maintainer (you)

* Replace placeholders with actual details.
* If your stack differs (e.g., Hono, Fastify, Prisma, SQLite), update **Tech Stack** and **Deployment**.
* Keep screenshots and the API section current so people can try it quick.

<p align="center">
  <img src="./preview.png" alt="Snippix preview" width="900"/>
  <br/>
  <em>Keyboard‑first snippet manager — light & dark themes</em>
</p>
