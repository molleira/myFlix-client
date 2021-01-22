// myFlix-client/src/director-view/director-view.jsx
import React from 'react';
// import { render } from 'sass';
// import { MovieView } from '../movie-view/movie-view';

// import styling
import './director-view.scss';

// export DirectorView
export class DirectorView extends React.Component {
  // initialise state
  constructor() {
    super();
    this.state = {};
  }

  // render director's info
  render() {
    const { movie } = this.props;
    if (!movie) return null;
    return (
      <div className='director-description p-2'>
        <p>Director's Biography</p>
        <p className='text-danger'>{MovieView.director.name}</p>
        <p>{MovieView.director.bio}</p>
        <p>Birth: {MovieView.director.birth}</p>
        <p>{MovieView.director.death ? `Death: ${movie.director.death}` : ''}</p>
      </div>
    );
  }
}