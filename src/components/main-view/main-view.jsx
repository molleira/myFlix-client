// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

// import React Router
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

// import components and logo
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import logo from '../../../public/images/logo.png';

// import styling
import './main-view.scss';

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
      movie: null,
      selectedMovie: null,
      user: null,
      // register: null
      email: null,
      birthday: null,
      register: 'register',
      profile: 'profile',
      favoriteMovies: [],
    };
  }

  // fetch movies from Heroku
  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        email: localStorage.getItem('email'),
        birthday: localStorage.getItem('birthday'),
        favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')),
      });
      this.getMovies(accessToken);
    }
  }

  // when a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // when a user successfully logs in, this function updates the `user` property in state to that particular user
  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username,
      email: authData.user.birthday,
      favoriteMovies: authData.user.favoriteMovies,
    });
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(authData.user.favoriteMovies)
    );

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('email', authData.user.email);
    localStorage.setItem('birthday', authData.user.birthday);
    this.getMovies(authData.token);
  }

  // when a user logs out, remove token and user in local storage
  onLoggedOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
  }

  // when a user registers, this function updates the `register`property
  onRegister(register) {
    this.setState({
      register: register
    });
  }

  // profile update
  onProfile(profile) {
    this.setState({
      profile: profile,
    });
    this.componentDidMount();
  }

  // profile deregister
  onUnregister(user) {
    this.setState({
      user: user,
    });
  }

  // when back button click selectedMovie will set on it's initial state
  setInititalState() {
    this.setState({
      selectedMovie: null
    });
  }

  getMovies(token) {
    axios.get('https://theflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
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

  render() {
    const { movies, register, user, profile } = this.state;

    // if user is not registered, the RegistrationView is rendered
    if (!register)
      return (
        <RegistrationView
          onRegister={(register) => this.onRegister(register)}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    // if there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView*/
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(register) => this.onRegister(register)}
        />
      );

    // if there is no profile, the ProfileView is rendered
    if (!profile)
      return (
        <ProfileView
          user={this.state.user}
          email={this.state.email}
          birthday={this.state.birthday}
          onProfile={(profile) => this.onProfile(profile)}
          onUnregister={(user) => this.onUnregister(user)}
        />
      );

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className='main-view'>

          <header>
            <Navbar
              collapseOnSelect
              expand='lg'
              fixed='top'
            >

              {/* <Navbar.Brand href='#home'>
                <img
                  src={logo}
                  className='d-inline-block align-top logo'
                  alt='React Bootstrap logo'
                />
              </Navbar.Brand> */}

              <Navbar.Brand>
                <Link to='/'>
                  <img
                    src={logo}
                    className='d-inline-block align-top'
                    alt='React Bootstrap logo'
                  />
                </Link>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  {/* <Nav.Link href='#movies'>Movies</Nav.Link>
                    <Nav.Link href='#genre'>Genre</Nav.Link>
                    <Nav.Link href='#director'>Director</Nav.Link>
                    <Nav.Link href='#logout'>Logout</Nav.Link>
                  </Nav> */}
                  <Nav.Link onClick={() => this.onProfile('')}>
                    PROFILE
                    </Nav.Link>
                  <Nav.Link onClick={() => this.onLoggedOut()}>LOGOUT</Nav.Link>
                </Nav>
                {/* <Form inline> */}
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
                {/* </Form> */}
              </Navbar.Collapse>

            </Navbar>
          </header>

          <div className='user-profile'></div>
          <div className='main-body text-center'>
            {/* {selectedMovie ? (
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
              )} */}

            <Container>
              <Row>
                <Route
                  exact
                  path='/'
                  render={() =>
                    movies.map((m) => (
                      <Col xs={12} md={6} lg={4} xl={3} key={m._id} className='p-2'>
                        <MovieCard key={m._id} movie={m} />
                      </Col>
                    ))
                  }
                />
              </Row>
            </Container>
            <Route
              path='/movies/:movieId'
              render={({ match }) => (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path='/movies/genre/:genre'
              render={({ match }) => (
                <GenreView
                  movie={movies.find(
                    (m) => m.genre.name === match.params.genre
                  )}
                />
              )}
            />

            <Container>
              <Row>
                <Route
                  exact
                  path='/movies/genre/:genre'
                  render={({ match }) =>
                    movies
                      .filter((m) => m.genre.name.includes(match.params.genre))
                      .map((m) => (
                        <Col xs={12} md={3} key={m._id} className='p-2'>
                          <MovieCard key={m._id} movie={m} />
                        </Col>
                      ))
                  }
                />
              </Row>
            </Container>

            <Route
              exact
              path='/movies/directors/:name'
              render={({ match }) => (
                <DirectorView
                  movie={movies.find(
                    (m) => m.director.name === match.params.name
                  )}
                />
              )}
            />

            <Container>
              <Row>
                <Route
                  exact
                  path='/movies/directors/:name'
                  render={({ match }) =>
                    movies
                      .filter((m) =>
                        m.director.name.includes(match.params.name)
                      )
                      .map((m) => (
                        <Col
                          xs={12}
                          md={{ span: 3 }}
                          key={m._id}
                          className='p-2'
                        >
                          <MovieCard key={m._id} movie={m} />
                        </Col>
                      ))
                  }
                />
              </Row>
            </Container>

          </div>

          <footer className='bg-dark text-white text-center'>
            <p className='pt-3'>
              Made by Marc Oller using React.
            </p>
          </footer>

        </div>
      </Router>
    );

    // return (
    // <Router>
    //   <div className="main-view">
    //     <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
    //     <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
    //   </div>
    // </Router>

    // <Router>
    //   <div className="main-view">
    //     <Route exact path="/" render={() => {
    //       if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    //       return movies.map(m => <MovieCard key={m._id} movie={m} />)
    //     }
    //     } />
    //     <Route path="/register" render={() => <RegistrationView />} />          <Route exact path="/movies/:movieId" render={/* movie view */} />
    //     <Route exact path="/genres/:name" render={/* genre view*/} />
    //     <Route path="/directors/:name" render={({ match }) => {
    //       if (!movies) return <div className="main-view" />;
    //       return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
    //     }
    //     } />
    //   </div>
    // </Router>
    // );

  }
}