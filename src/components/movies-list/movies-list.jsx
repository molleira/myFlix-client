// src/components/movies-list/movies-list.jsx
import React from 'react';
import { connect } from 'react-redux';

// styling
import { Col, Row } from 'react-bootstrap';
import './movies-list.scss';

// import filter and MovieCard components
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

// sets state for the filter
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// sets the props
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  // return filteredMovies.map(m => <MovieCard key={m._id} movie={m} />);

  return (
    <div className="movies-list">
      <VisibilityFilterInput className='search-bar' visibilityFilter={visibilityFilter} />
      <Row>
        {filteredMovies.map((m) =>
          <Col xs={12} md={6} lg={4} xl={3} key={m._id} className='p-2'>
            <MovieCard
              movies={m} />
          </Col>
        )}
      </Row>
    </div>
  );
}

// connects to the store
export default connect(mapStateToProps)(MoviesList);