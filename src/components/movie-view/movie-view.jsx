// myFlix-client/src/movie-view/movie-view.jsx
import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// styling
import { Button, Card, Row } from 'react-bootstrap';
import './movie-view.scss';

// export MovieView class component
export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFav(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: `https://theflix.herokuapp.com/users/${username}/Movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} was added to your Favorites`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    // if the state is null returns this
    return (
      <Row className='movie-view'>
        <Card border="light">
          <Card.Img className='poster' variant='top' src={movie.ImagePath} />

          <Card.Body>
            <Card.Title style={{ color: '#EB3F3F' }}>{movie.Title}</Card.Title>

            <Card.Text>
              <span className='label text-danger'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </Card.Text>

            <Card.Text>
              <span className='label text-danger'>Genre: </span>
              <span className='value'>{movie.Genre.Name}</span>
              <br></br>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Know more about this Genre</Button>
              </Link>
            </Card.Text>

            <Card.Text>
              <span className='label text-danger'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
              <br></br>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Know more about this Director</Button>
              </Link>
            </Card.Text>

            <Link to={'/'}>
              <Button variant="outline-danger">Back</Button>
            </Link>

            <Button variant='outline-danger' className="fav-button" value={movie._id} onClick={(e) => this.addFav(e, movie)}>
              Add to Favorites
            </Button>

          </Card.Body>
        </Card>

      </Row>
    );
  }
}

// static propTypes properties for MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
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
};