// // myFlix-client/src/director-view/director-view.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

//styling
import { Button, Card, Row } from 'react-bootstrap';
import './director-view.scss';

// export DirectorView class component
export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Row className="director-view">
        <Card className='director-card' border="light">

          <Card.Title style={{ color: '#EB3F3F' }}>{director.Name}</Card.Title>

          <Card.Text>
            <span className="label text-danger">Description: </span>
            <span className="value">{director.Bio}</span>
          </Card.Text>

          <Card.Text className="director-birth">
            <span className="label text-danger">Birth: </span>
            <span className="value">{director.Birth}</span>
          </Card.Text>

          <Card.Text className="director-death">
            <span className="label text-danger">Death: </span>
            <span className="value">{director.Death}</span>
          </Card.Text>

          <div className="director-movies">
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

// static propTypes properties for DirectorView
// DirectorView.propTypes = {
//   director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string.isRequired,
//     Birth: PropTypes.string.isRequired,
//     Death: PropTypes.string,
//   }).isRequired,
// };
