import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styled = styled(Link)`
  color: ${(props) => props.theme.colors.main};
  text-decoration: none;
`;

export { Styled as Link };
