// myFlix-client/src/login-view/login-view.jsx
import React, { useState } from 'react';

// import propTypes and Bootstrap components
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

// import styling and logo
import './login-view.scss';
import logo from '../../../public/images/logo.png';

// export LoginView Hook
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <React.Fragment>
      <Form className='form-login'>
        <h1 className='text-danger'>Welcome to<span><img src={logo} className='logointro' /></span></h1>
        <p className='mb-5'>Please login to continue.</p>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter Password'
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant='danger' type='submit' className='submit' >
          Submit
        </Button>
        <p>
          Don't have an account? <span className='register'>Register here</span>
        </p>
      </Form>
    </React.Fragment >
  );
}

// static propTypes properties for LoginView
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};