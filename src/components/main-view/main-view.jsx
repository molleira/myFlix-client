// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';

// styling
import { Col, Row } from 'react-bootstrap';
import './main-view.scss';

// components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { ProfileView } from '../profile-view/profile-view';

import { NavView } from '../nav-view/nav-view';

// export MainView class component
export class MainView extends React.Component {
  constructor() {
    super();
    // initial state set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  // get movies method
  getMovies(token) {
    axios.get('https://theflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
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

  // get token and show movies
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // function to log in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>

        <NavView user={user} />

        <Row className='main-view'>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map((m) =>
              <Col xs={12} md={6} lg={4} xl={3} key={m._id} className='p-2'>
                <MovieCard
                  key={m._id}
                  movie={m}
                />
              </Col>
            )
          }
          } />

          <Route path="/register" render={() =>
            <RegisterView />} />

          <Route path="/movies/:movieId" render={({ match }) =>
            <MovieView
              movie={movies.find(m => m._id === match.params.movieId)} />}
          />

          <Route path="/genres/:name" render={({ match }) =>
            <GenreView
              genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
              movies={movies.filter((m) => m.Genre.Name === match.params.name)} />
          } />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView
              director={movies.find((m) => m.Director.Name === match.params.name).Director}
              movies={movies.filter((m) => m.Director.Name === match.params.name)} />
          }
          } />

          <Route path="/users/:username" render={() => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return;
            return <ProfileView movies={movies} />;
          }
          } />

        </Row>
      </Router>
    );
  }
}

MainView.propTypes = {
  movie: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }),
  user: PropTypes.string,
};