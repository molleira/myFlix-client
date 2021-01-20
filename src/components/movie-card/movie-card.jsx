// myFlix-client/src/movie-card/movie-card.jsx
import React from 'react';

// import propTypes and Bootstrap components
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

// import React Router
import { Link } from "react-router-dom";

// import styling
import './movie-card.scss'

// export MovieCard
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    // return (
    //   <Card
    //     onClick={() => onClick(movie)}
    //     border='danger'
    //   >
    //     <Card.Header>{movie.Title}</Card.Header>
    //     <img
    //       className='movie-poster'
    //       src={movie.ImagePath}
    //       alt='movie poster'
    //     />
    //   </Card>
    // );

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );

  }
}

// static propTypes properties for MovieCard
MovieCard.propTypes = {
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