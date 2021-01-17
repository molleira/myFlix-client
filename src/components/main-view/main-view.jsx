// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

// import components
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import logo from '../../../public/images/logo.png';

// import styling
import './main-view.scss'

// import Bootstrap components
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';

// import Font Awesome React Icons
import { FaSearch } from 'react-icons/fa';

// export MainView
export class MainView extends React.Component {

  constructor() {
    super();
    // initial state set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  // fetch movies from Heroku
  componentDidMount() {
    axios.get('https://theflix.herokuapp.com/movies')
      .then(response => {
        // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // when a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // when a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // when a user registers, this function updates the `register`property
  onRegister(register) {
    this.setState({
      register
    });
  }

  // when back button click selectedMovie will set on it's initial state
  setInititalState() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // if there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if user is not registered, the RegisterView is rendered
    if (!register) return <RegisterView onRegister={register => this.onRegister(register)} />

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        <div className='main-view'>

          <header>
            <Navbar
              collapseOnSelect
              expand='lg'
              fixed='top'
            >

              <Navbar.Brand href='#home'>
                <img
                  src={logo}
                  className='d-inline-block align-top logo'
                  alt='React Bootstrap logo'
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='#movies'>Movies</Nav.Link>
                  <Nav.Link href='#genre'>Genre</Nav.Link>
                  <Nav.Link href='#director'>Director</Nav.Link>
                  <Nav.Link href='#logout'>Logout</Nav.Link>
                </Nav>
                <Form inline>
                  <InputGroup>
                    <FormControl
                      placeholder='Search'
                      aria-label='Search'
                      aria-describedby='basic-addon2'
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id='basic-addon2'>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Navbar.Collapse>

            </Navbar>
          </header>

          <div className='main-body text-center'>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.setInititalState()}
              />
            ) : (
                <Container className='p-5'>
                  <Row>
                    {movies.map((movie) => (
                      <Col xs={12} md={6} lg={4} xl={3} key={movie._id} className='p-2'>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onClick={(movie) => this.onMovieClick(movie)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Container>
              )}
          </div>

          <footer className='bg-dark text-white text-center'>
            <p className='pt-3'>
              Made by Marc Oller using React.
            </p>
          </footer>

        </div>
      </React.Fragment>
    );
  }
}