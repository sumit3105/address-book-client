# Vision UI Integration Guide (React 18)

This document outlines the steps to integrate the `vision-ui` library into your project as a Git submodule, ensuring that dependency version conflicts are resolved by aligning the parent project with the library's core versions.

---

## 1. Version Alignment Strategy
To ensure stability and prevent "Invalid Hook Call" errors, the parent project must be aligned with the versions used in `vision-ui`.

| Dependency | Vision UI Version | Action Required in Parent |
| :--- | :--- | :--- |
| **React** | `^18.2.0` | Downgrade from 19 to 18 |
| **react-dom** | `^18.2.0` | Downgrade from 19 to 18 |
| **styled-components** | `6.1.8` | Pin to 6.1.8 |
| **TypeScript** | `^4.7.4` | Downgrade from 6.0 to 4.7 (Recommended) |

---

## 2. Submodule Setup
Run the following commands in your project root (it is done, you can skip this step):

```bash
# Add the submodule at the desired path
git submodule add -b feature/new-vayana-theme git@bitbucket.org:vayana/vision-ui.git src/libs/vision-ui

# Initialize and update
git submodule update --init --recursive
```

---

## 3. Parent Dependency Configuration
Update your `package.json` to include the library and align versions:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "6.1.8",
    "vision-ui": "file:./src/libs/vision-ui"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^4.7.4"
  }
}
```

**Perform a clean install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 4. Vite Configuration (`vite.config.ts`)
Set up aliases to import directly from the library's source and expose environment variables:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allows you to import components directly from source
      '@vision-ui': path.resolve(__dirname, './src/libs/vision-ui/src/feature'),
    },
  },
  define: {
    // Shared environment variable for icons, fonts, and i18n
    'process.env.STATIC_ASSETS_PATH': JSON.stringify('/assets/'),
  }
});
```

---

## 5. Global Runtime Setup (`main.tsx`)
Wrap your application in the `vision-ui` theme and load the global variables.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { vayanaThemeApril2026, GlobalFonts } from '@vision-ui/theme'; // Using our alias
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={vayanaThemeApril2026}>
      <GlobalFonts />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

---

## 6. Managing Static Assets
The library depends on fonts, icons, and translation JSONs located in its `static/assets` folder. You must make these available in your public root:

**Automated approach (package.json):**
```json
"scripts": {
  "copy-assets": "cp -r ./src/libs/vision-ui/static/assets ./public/assets",
  "build-theme": "npm run build-tokens --prefix src/libs/vision-ui",
  "predev": "npm run copy-assets && npm run build-theme"
}
```

---

## 7. Troubleshooting
*   **404 Icons/Fonts**: Ensure the `copy-assets` script ran and that your `public/assets` folder contains the `icons`, `fonts`, and `locales` subdirectories.
*   **TypeScript Errors**: If you see "Module not found", verify that the `@vision-ui` path alias in `vite.config.ts` matches exactly the path to your submodule.
*   **Version Mismatch**: If you see "Invalid Hook Call", use `npm ls react` to ensure only one version of React (18.x) exists in your project tree.
