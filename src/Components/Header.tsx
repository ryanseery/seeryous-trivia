import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from './Link';

const HeaderWrapper = styled.nav`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.main};
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
  ul {
    list-style: none;
    li {
      font-size: ${(props) => props.theme.fontSizes.medium};
    }
  }
`;

type Props = {
  token: null | string;
};

export function Header({ token = null }: Props): ReactElement {
  const location = useLocation();

  return (
    <HeaderWrapper>
      <Link to="/signin">
        <h1>Seeryous Trivia</h1>
      </Link>
      <ul>
        <li>
          {location.pathname === '/signin' ? <Link to="/signup">Sign Up</Link> : <Link to="/signin">Sign In</Link>}
        </li>
      </ul>
    </HeaderWrapper>
  );
}
