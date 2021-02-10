// myFlix-client/src/movie-card/movie-card.jsx
import React from 'react';
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// styling
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss'

// export MovieCard class component
export class MovieCard extends React.Component {

  render() {
    const { movies } = this.props;

    return (
      <Card>

        <Card.Img variant="top" src={movies.ImagePath} />

        <Card.Body>
          <Card.Title>{movies.Title}</Card.Title>
          <Card.Text>{movies.Genre.Name} - {movies.Director.Name}</Card.Text>

          <div>
            <Link to={`/movies/${movies._id}`}>
              <Button variant="outline-danger">
                Open
              </Button>
            </Link>
          </div>

        </Card.Body>
      </Card>
    );
  }
}

// static propTypes properties for MovieCard
// MovieCard.propTypes = {
//   movie: PropTypes.shape({
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
//   }).isRequired,
// };