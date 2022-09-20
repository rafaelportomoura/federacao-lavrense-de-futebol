import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import './navBar.css'
const FLFNavBar = () => {
  return (
    <>
      <Navbar className="nav" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link className="navColor" href="/campeonatos">Campeonatos</Nav.Link>
            <Nav.Link className="navColor" href="/times">Times</Nav.Link>
            <Nav.Link className="navColor" href="/partidas">Partidas</Nav.Link>
          </Nav>
          <Nav>
          <NavDropdown title={<IconContext.Provider value={{color: 'white', size: '30px'}}><AiOutlineUser/></IconContext.Provider>}id="collasible-nav-dropdown">
              <NavDropdown.ItemText>Admin</NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/alterar-senha">
                Alterar senha
              </NavDropdown.Item>
              <NavDropdown.Item href="/alterar-email">
                Alterar e-mail
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default FLFNavBar;