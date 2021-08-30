import React, { useState } from 'react';
import { NavLink, Link }   from 'react-router-dom';
import Navbar              from 'react-bootstrap/Navbar';
import Nav                 from 'react-bootstrap/Nav';
import { CustomToggle }    from './CustomToggle';
import brandSVG            from './patron-technology-brand.svg';


/* =============================================================================

============================================================================= */


export function NavBar(): React.ReactElement | null {
  const [show, setShow] = useState(false);
  const toggleCollapse  = () => { setShow(currentValue => !currentValue); };


  return (
    <Navbar 
      expanded={show}
      bg="blue" 
      variant="dark"
      className="font-montserrat" expand="lg"
      // collapseOnSelect // Seems to only work when not controlled externally.
      // onToggle={(expanded) => { console.log("You toggled! expanded: ", expanded); }} 
    >
      {/* No need for <Container fluid /> */}
      <div className="container-fluid">
        {/* No need for <Navbar.Brand /> */}
        <Link id="brand" className="navbar-brand p-0" to="/">
          <img src={brandSVG} className="d-inline-block" style={{ height: 38 }}  alt="brand" />
        </Link>

        {/* No need for <Navbar.Toggle aria-controls="main-navbar" onClick={() => { }} /> */}
        <CustomToggle show={show} toggleCollapse={toggleCollapse} /> 


        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <NavLink className="nav-link" activeClassName="active-link" to="/contacts">Contacts</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/kontakts">Kontakts</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/friends">Friends</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/counter">Counter</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/about">About</NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}