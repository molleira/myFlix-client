// myFlix-client/src/genre-view/genre-view.jsx
import React from 'react';

// import styling
import './genre-view.scss';

// export GenreView
export class GenreView extends React.Component {
  // initialise state
  constructor() {
    super();
    this.state = {};
  }

  // render genre's info
  render() {
    const { movie } = this.props;
    if (!movie) return null;
    return (
      <div className='genre-description p-2'>
        <p>Genre</p>
        <p className='text-danger'>{movie.genre.name}</p>
        <p>{movie.genre.description}</p>
      </div>
    );
  }
}