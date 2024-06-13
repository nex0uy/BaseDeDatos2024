import styled from 'styled-components';
import { variables, mixins } from '../styles/theme';

export const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
`;

export const Form = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  padding: 0vh 0vh 0vh 0vh;
  border-radius: 15px;
  ${mixins.boxShadow};
  width: 90%;
  max-width: 400px;
  height: auto;
  backdrop-filter: blur(10px);

  @media (max-width: 600px) {
    padding: 4vh 4vw;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }

  @media (min-width: 601px) and (max-width: 768px) {
    padding: 4vh 4vw;
    width: 90%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 8vh 8vw;
    width: 100%;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    padding: 8vh 8vw;
    width: 100%;
  }

  @media (min-width: 1201px) {
    padding: 3vh 3vw;
    width: 60%;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  padding: 0vh 0vh 0vh 0vh;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3vh;

  @media (max-width: 600px) {
    margin-bottom: 2vh;
  }
`;

export const Label = styled.label`
  margin-bottom: 1vh;
  color: ${variables.textColor};
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px; /* Padding para asegurar suficiente espacio */
  border: none;
  border-radius: 5px;
  color: #1e3c72;
  box-sizing: border-box;
  font-size: 16px; /* Tamaño de la fuente */
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.0vh;
  text-align: left; /* Texto alineado a la izquierda */
  line-height: 1.5; /* Altura de la línea para centrar verticalmente */
  height: 3em; /* Altura del input */

  @media (max-width: 600px) {
    padding: 12px 20px;
    margin-bottom: 1.5vh;
  }

  &:focus {
    outline: none;
    border: 1px solid ${variables.primaryColor};
  }
`;

export const Button = styled.button`
  padding: 2vh 4vh;
  border: none;
  border-radius: 5px;
  background: ${variables.primaryColor};
  color: ${variables.backgroundColor};
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 2vh;

  &:hover {
    background: ${variables.secondaryColor};
  }
`;

export const Title = styled.h2`
  margin-bottom: 5vh;
  color: ${variables.primaryColor};
  text-align: center;
  font-size: 24px;

  @media (max-width: 600px) {
    font-size: 20px;
  }

  @media (min-width: 601px) and (max-width: 768px) {
    font-size: 22px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 24px;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    font-size: 26px;
  }

  @media (min-width: 1201px) {
    font-size: 28px;
  }
`;

export const RegisterLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: ${variables.textColor};

  a {
    color: ${variables.primaryColor};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
