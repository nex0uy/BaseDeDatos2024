import styled from 'styled-components';
import { variables } from '../styles/theme';

export const FormGroup = styled.div`
  display: flex;
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

export const Select = styled.select`
  width: 100%;
  padding: 1.5vh;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2vh;

  @media (max-width: 600px) {
    padding: 1.5vh;
    margin-bottom: 1.5vh;
  }
`;
