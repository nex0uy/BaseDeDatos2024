import { createGlobalStyle } from 'styled-components';
import { variables, mixins } from './theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1e3c72; /* O el color de fondo que prefieras */
    font-family: ${variables.fontFamily};
  }

  #root {
    width: 100%;
    height: 100%;
    ${mixins.flexCenter};
  }
`;

export default GlobalStyle;
