// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import PropTypes from 'prop-types';

// styling
import { Row } from 'react-bootstrap';
import './main-view.scss';

// components
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { ProfileView } from '../profile-view/profile-view';

import { NavView } from '../nav-view/nav-view';

// redux actions
import {
  setMovies,
  setUser,
  setUserToken,
  setFavoriteMovies
} from '../../actions/actions';

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

  // get token and show movies
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      // this.getMovies(accessToken);
      this.props.setUser(localStorage.getItem('user'));
      this.getUserData(accessToken, user);
    }
  }

  // get movies method
  getMovies(token) {
    axios.get('https://theflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // assign the result to the state
        // this.setState({
        //   movies: response.data
        // });

        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // get user data
  getUserData(userToken, user) {
    axios.get(`https://theflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
      .then((response) => {
        this.getMovies(userToken);
        let userData = response.data;
        this.props.setUser(userData.Username);
        this.props.setUserToken(userToken);
        this.props.setFavoriteMovies(userData.FavoriteMovies);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function to log in
  onLoggedIn(authData) {
    // console.log(authData);
    // this.setState({
    //   user: authData.user.Username
    // });
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUserData(authData.token, authData.user.Username);
  }

  render() {
    const { movies, user } = this.props;

    // #2
    // let { movies } = this.props;
    // let { user } = this.state;

    // before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>

        <NavView user={user} />

        <Row className='main-view'>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            // return movies.map((m) =>
            //   <Col xs={12} md={6} lg={4} xl={3} key={m._id} className='p-2'>
            //     <MovieCard
            //       key={m._id}
            //       movie={m}
            //     />
            //   </Col>
            // )

            return <MoviesList movies={movies} />;
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

// #3
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
    userToken: state.userToken,
    favoriteMovies: state.favoriteMovies
  }
}

// #4
export default connect(mapStateToProps, { setMovies, setUser, setUserToken, setFavoriteMovies })(MainView);

// MainView.propTypes = {
//   movie: PropTypes.arrayOf({
//     _id: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//     }),
//     ImagePath: PropTypes.string.isRequired,
//     Featured: PropTypes.bool,
//   }),
//   user: PropTypes.string,
// };