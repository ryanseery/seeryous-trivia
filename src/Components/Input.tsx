import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  display: block;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.inputBorder};
  font-size: ${(props) => props.theme.fontSizes.input};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.black};
  &:focus-within {
    border-color: ${(props) => props.theme.colors.background};
  }
`;

export const ColorInput = styled.input`
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.inputBorder};
  font-size: ${(props) => props.theme.fontSizes.input};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.black};
  &:focus-within {
    border-color: ${(props) => props.theme.colors.background};
  }
`;
