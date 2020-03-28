import styled from 'styled-components';

export const Card = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.4em;
  height: auto;
  overflow-x: hidden;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
`;
