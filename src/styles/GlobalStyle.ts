import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.color.bg.default};
    color: ${({ theme }) => theme.color.text.primary};
    transition: background-color 0.2s ease, color 0.2s ease;
  }
`;
