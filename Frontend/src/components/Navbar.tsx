import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/dashboard">Dashboard</Link></NavItem>
        <NavItem><Link to="/create">Create Song</Link></NavItem>
        <NavItem><Link to="/songs">All Songs</Link></NavItem>
        <NavItem><Link to="/artists">Artists</Link></NavItem>
        <NavItem><Link to="/albums">Albums</Link></NavItem>
        <NavItem><Link to="/genres">Genres</Link></NavItem>
      </NavList>
    </Nav>
  );
};

export default Navbar;