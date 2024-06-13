import { css } from 'styled-components';

export const variables = {
  primaryColor: '#1e3c72',
  secondaryColor: '#2a5298',
  backgroundColor: '#ffffff',
  textColor: '#333',
  fontFamily: 'Roboto, sans-serif',
};

export const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  boxShadow: css`
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  `,
};
