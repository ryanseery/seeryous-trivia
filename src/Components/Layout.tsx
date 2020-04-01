import styled from 'styled-components';

export const Layout = styled.div`
  margin: auto;
  max-width: 1280px;
  background-color: ${(props) => props.theme.colors.appBackGround};
  h2,
  h3,
  h4 {
    font-size: ${(props) => props.theme.fontSizes.large};
    text-transform: capitalize;
  }
`;
