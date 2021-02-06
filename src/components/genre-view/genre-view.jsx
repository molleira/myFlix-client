// // myFlix-client/src/genre-view/genre-view.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// // sytling
import { Button, Card, Row } from 'react-bootstrap';
import './genre-view.scss';

// export GenreView class function
export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    return (
      <Row className="genre-view">
        <Card className='genre-card' border="light">
          <Card.Title style={{ color: '#EB3F3F' }}>{genre.Name}</Card.Title>

          <Card.Text>
            <span className="label text-danger">Description: </span>
            <span className="value">{genre.Description}</span>
          </Card.Text>

          <div className='genre-list'>
            <span className="label text-danger">Movies: </span>
            {movies.map((m) => (
              <div className="movie" key={m._id}>{m.Title}</div>
            ))}
          </div>

          <Link to={'/'}>
            <Button variant="outline-danger">Back</Button>
          </Link>
        </Card>
      </Row>
    );
  }
}

// static propTypes properties for GenreView
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};