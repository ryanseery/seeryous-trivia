import styled from 'styled-components';

type Props = {
  color?: string;
};
export const Button = styled.button<Props>`
  width: 100%;
  background-color: ${(props) => (props.color ? props.color : props.theme.colors.main)};
  color: ${(props) => props.theme.colors.background};
  border: none;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin: 4px 2px;
  cursor: pointer;
`;
