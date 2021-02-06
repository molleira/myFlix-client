// myFlix-client/src/profile-view/profile-view.jsx
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// styling
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import './profile-view.scss';

// export ProfileView class component
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://theflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // remove favorite method
  handleRemoveFavorite(e, movie) {
    e.preventDefault();
    axios
      .delete(`https://theflix.herokuapp.com/users/${username}/Movies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie removed from favorites.');
        this.componentDidMount();
        // window.open('_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // update user info method
  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `https://theflix.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  // delete user method
  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://theflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;

    return (
      <Row className="profile-view">

        <Card className="profile-card">

          <h1>{username}'s Favorite Movies</h1>
          <Card.Body>
            {FavoriteMovies.length === 0 && <div className="text-center">You have no favorite movies.</div>}

            <div className="favorites-container">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <CardDeck className="movie-card-deck">
                        <Card className="favorites-item card-content" style={{ width: '16rem', flex: 1 }} key={movie._id}>
                          <Card.Img variant="top" src={movie.ImagePath} />
                          <Card.Body className="movie-card-body">
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size="sm" block className="profile-button remove-favorite" onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="text-center section">Update Profile</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} pattern="[a-zA-Z0-9]{6,}" />
                <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="Current or New Password" onChange={(e) => this.setPassword(e.target.value)} pattern=".{6,}" required />
                <Form.Control.Feedback type="invalid">Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                <Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
              </Form.Group>

              <Button variant='outline-danger' type="submit" block>
                Update
              </Button>

              <h1 className="text-center section">Delete Your Profile</h1>
              <Card.Body>
                <Button variant='outline-danger' block onClick={(e) => this.handleDeregister(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};