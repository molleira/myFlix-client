// myFlix-client/src/movie-view/movie-view.jsx
import React from 'react';

// import React Router
import { Link } from "react-router-dom";

// import axios and Bootstrap components
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

// import styling
import './movie-view.scss';

// export MovieView
export class MovieView extends React.Component {
  constructor() {
    super();
    // set initial state
    // this.state = {};
  }

  render() {
    const { movie, user } = this.props;

    if (!movie) return null;

    // handles favorite movie list
    const handleSubmit = (e) => {
      e.preventDefault();
      let checkMovieExistLS = [];
      checkMovieExistLS = JSON.parse(localStorage.getItem('favoriteMovies'));
      if (checkMovieExistLS.includes(movie.title)) {
        alert('Movie already added on favorite list');
        return;
      }

      // fetch user's favorile movies list
      axios.post(`https://theflix.herokuapp.com/users/${user}/movies/${movie.title}`)
        .then((response) => {
          console.log(response);
          checkMovieExistLS.push(movie.title);
          localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(checkMovieExistLS)
          );
          alert('Movie successfully added to favorite');
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
      // if the state is null returns this
      // return (
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
            {/* <Button onClick={() => onClick()} variant='danger'>Back</Button> */}
            <Link to={`/`}>
              <Button variant='link'>Back</Button>
            </Link>
            <Link to={`/movies/directors/${movie.director.name}`}>
              <Button variant='link'>Director</Button>
            </Link>

            <Link to={`/movies/genre/${movie.genre.name}`}>
              <Button variant='link'>Genre</Button>
            </Link>
            <Button variant='link' onClick={(e) => handleSubmit(e)}>
              Add to favorite
            </Button>
          </Card.Body>
        </Card>
      </div>
      // );
      // <Card style={{ width: '16rem' }}>
      //   <Card.Img variant="top" src={movie.ImagePath} />
      //   <Card.Body>
      //     <Card.Title>{movie.Title}</Card.Title>
      //     <Card.Text>{movie.Description}</Card.Text>
      //     <Link to={`/directors/${movie.Director.Name}`}>
      //       <Button variant="link">Director</Button>
      //     </Link>

      //     <Link to={`/genres/${movie.Genre.Name}`}>
      //       <Button variant="link">Genre</Button>
      //     </Link>
      //   </Card.Body>
      // </Card>
    );
  }
}

// static propTypes properties for MovieView
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.number.isRequired,
//       Death: PropTypes.number,
//     }),
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };