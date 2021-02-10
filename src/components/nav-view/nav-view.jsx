// myFlix-client/src/nav-view/nav-view.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// styling
import { Navbar, Nav } from 'react-bootstrap';
import './nav-view.scss';
import logo from '../../../public/images/logo.png';

// export NavView class function
export class NavView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // function to log out
  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    const pathMovies = `/`;
    const pathProfile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top">

        <Navbar.Brand href="/">
          <img
            src={logo}
            className='logo'
            alt='myFlix logo' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Link as={Link} to={pathMovies} className="link-text">
              Movies
            </Nav.Link>

            <Nav.Link as={Link} to={pathProfile} className="link-text">
              Profile
            </Nav.Link>

            <Nav.Link to={'/'} onClick={this.onLoggedOut}>
              Log Out
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}