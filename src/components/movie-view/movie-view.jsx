// myFlix-client/src/movie-view/movie-view.jsx
import React from 'react';

// import propTypes and Bootstrap components
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

// export MovieView
export class MovieView extends React.Component {
  constructor() {
    super();
    // set initial state
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    // if the state is null returns this
    return (
      <div className='movie-view'>
        <Card style={{ margin: 'auto', padding: '50px' }}>
          <Card.Img variant='top' src={movie.ImagePath} />
          <Card.Body>
            <Card.Title style={{ color: '#EB3F3F' }}>{movie.Title}</Card.Title>
            <Card.Text>
              <span className='label text-danger'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Genre: </span>
              <span className='value'>{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
            </Card.Text>
            <Button onClick={() => onClick()} variant='danger'>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// static propTypes properties for MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number.isRequired,
      Death: PropTypes.number,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};