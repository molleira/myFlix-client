// src/components/visibility-filter-input/visibility-filter-input.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// styling
import Form from 'react-bootstrap/Form';

// redux action
import { setFilter } from '../../actions/actions';

// sets the filter value when filtering
function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search"
  />;
}

// connects to the store
export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);