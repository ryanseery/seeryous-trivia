import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  display: block;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-width: 1.5px 1.5px 1.5px 4px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.inputBorder};
  font-size: ${(props) => props.theme.fontSizes.input};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.black};
  &:focus-within {
    border-color: ${(props) => props.theme.colors.background};
  }
`;
