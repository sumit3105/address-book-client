import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { vayanaThemeApril2026 } from '@vision-ui/theme';
import { I18nextProvider } from 'react-i18next';
import { i18nConfig } from '@vision-ui/architectural/i18n';
import { ViewportProvider } from '@vision-ui/architectural/viewPort';
import 'reactjs-popup/dist/index.css';
import { store } from '@/store';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={vayanaThemeApril2026 as DefaultTheme}>
      <ViewportProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18nConfig as any}>
            <App />
          </I18nextProvider>
        </Provider>
      </ViewportProvider>
    </ThemeProvider>
  </StrictMode>
);
