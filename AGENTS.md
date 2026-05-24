---
name: coding-convention
description: >
    Apply the user's personal coding conventions to any file or project.
    Trigger when the user says "rrr" (apply to specific files mentioned) or "rra" (apply to all files in the project).
    Also trigger when the user asks to "fix formatting", "apply convention", or "clean up code style".
---

# Vite-React-TypeScript

## Repo Guide

**Stack:** Vite 8 + React 19 + TypeScript 6 + Tailwind CSS 4 + pnpm

**Entrypoint:** `src/main.tsx` → `src/App.tsx` (React Router v7, Layout at `/`)

### Commands
```bash
pnpm dev              # Start dev server (port from .env, default 8000)
pnpm build            # tsc -b && vite build (typecheck + bundle)
pnpm lint             # ESLint with typescript-eslint + react-hooks
pnpm preview          # vite preview
pnpm exec tsc --noEmit  # Type-check only (fast)
```

### Key Config & Quirks

- **Alias:** `$/` → `src/` (defined in `tsconfig.app.json`, wired via `vite.config.ts` `getAliases()`)
- **No test setup** — no test runner, no test files. Do not suggest adding tests unless asked.
- **`verbatimModuleSyntax`** is on → use `import type` for type-only imports, never `import { type Foo }`
- **`noUnusedLocals` / `noUnusedParameters`** are strict — remove unused imports/vars or prefix unused params with `_`
- **Build order matters:** `tsc -b` (project references) runs first, then `vite build`
- **i18n:** `en.json` + `th.json` under `src/i18n/locales/`. When adding a page, add keys to both files.
- **Theme:** persisted via Zustand `persist` middleware (key: `theme`). Dark mode is applied before React hydrates via inline `<script>` in `index.html`.
- **Env:** validated at runtime by `@t3-oss/env-core` in `src/secure/env.ts`. `.env` is gitignored.
- **3D:** Three.js scene components live under `src/pages/threejs/`. Canvas setup in `SceneViewer.tsx`, shapes in `FloatingShapes.tsx`.
- **Dockerfile CMD is stale** (references `dist/server/index.js` which doesn't exist). Ignore it.
- **Pages architecture:** each page is a directory under `src/pages/` containing a main `PageName.tsx` + sub-components. `components/custom/` for reusable UI atoms, `components/screen/` for lazy-load wrappers, `components/layout/` for Layout/Providers/Navbar/Footer.

---

## Coding Convention

Apply these rules to every file created or modified.

---

## Shorthand Commands

| Command | Meaning                                                          |
| ------- | ---------------------------------------------------------------- |
| `rrr`   | Apply conventions to files mentioned earlier in the conversation |
| `rra`   | Apply conventions to every file in the project                   |

---

## Rules

### 1. Path Comment (first line of every file)

Every file that supports comments must have a path comment as the very first line.
Format: `// -Path: 'ProjectName/path/to/file.ext'`
**Exception**: `.json` files (JSON does not support comments)

```ts
// -Path: 'MyProject/src/components/Button.tsx'
```

```css
/* -Path: 'MyProject/src/app/globals.css' */
```

```python
# -Path: 'MyProject/utils/helper.py'
```

---

### 2. Import Order

Sort each import line by **character length, ascending**.
If two lines are the same length, sort alphabetically.

```ts
// ✅ correct
import { use } from "react";
import { Link } from "$/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

// ❌ wrong
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
```

---

### 3. Variable Declaration Order

Sort variable declarations by **character length, ascending**.
**Exception**: if a variable depends on another (must be declared first), keep the dependency order and note it with a comment.

```ts
// ✅ correct
const id = params.id;
const locale = useLocale();
const pathname = usePathname();
const translations = useTranslations("home");

// dependency exception — router must come first because handleChange uses it
const router = useRouter();
const handleChange = () => router.push("/");
```

---

### 4. React Components

Use **function components only**. Never use class components.

```tsx
// ✅ correct
export function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}

// ❌ wrong
export class Button extends React.Component { ... }
```

---

### 5. Brace-less Single-line Statements

Omit `{}` for `if/else` branches and arrow functions that fit on one line.

```ts
// ✅ correct
if (isLoading) return null;
const double = (value: number) => value * 2;

// ❌ wrong
if (isLoading) {
    return null;
}
const double = (value: number) => {
    return value * 2;
};
```

---

### 6. JSDoc Comments

Always use **JSDoc** instead of plain comments wherever the file supports comments.
Do not add any comments to files that do not support them (e.g. `.json`).

```ts
// ✅ correct
/**
 * Calculates the total price after discount.
 * @param price - item price
 * @param discount - discount percentage (0–100)
 */
function calculateTotal(price: number, discount: number): number {
  return price * (1 - discount / 100);
}

// ❌ wrong
// calculate total price
function calculateTotal(price: number, discount: number): number { ... }
```

---

### 7. No Single-letter Variable Names

Never use single-letter or meaningless abbreviations.

| ❌ avoid | ✅ use instead         |
| -------- | ---------------------- |
| `e`      | `event`                |
| `c`      | `color` / `clr`        |
| `b`      | `box`                  |
| `k`      | `key`                  |
| `i`      | `index`                |
| `v`      | `value`                |
| `fn`     | `callback` / `handler` |

```ts
// ✅ correct
items.forEach((item, index) => console.log(index, item));
input.addEventListener("change", (event) => handleChange(event));

// ❌ wrong
items.forEach((i, k) => console.log(k, i));
input.addEventListener("change", (e) => handleChange(e));
```

---

### 8. Package Manager

Use **pnpm only**. Never suggest or use `npm`, `yarn`, or `bun`.

```bash
# ✅ correct
pnpm add zod
pnpm install

# ❌ wrong
npm install zod
yarn add zod
```

---

## Pre-output Checklist

- [ ] First line is a path comment (unless `.json`)
- [ ] Imports sorted by length ascending
- [ ] Variables sorted by length ascending (dependency exceptions noted)
- [ ] React uses function components only
- [ ] Single-line if/arrow has no braces
- [ ] Comments are JSDoc
- [ ] No single-letter variable names
- [ ] Package manager is pnpm
