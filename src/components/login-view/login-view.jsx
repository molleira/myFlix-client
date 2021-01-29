// myFlix-client/src/login-view/login-view.jsx
import React, { useState } from 'react';

// import axios and Bootstrap components
import axios from 'axios';
// import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

// import styling and logo
import './login-view.scss';
import logo from '../../../public/images/logo.png';

// export LoginView Hook
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  // handles submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    // props.onLoggedIn(username);
    const isValid = formValidation();

    // send POST login request
    axios
      .post('https://theflix.herokuapp.com/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(() => {
        console.log('Invalid Credential');
        formValidation('Invalid Credential');
      });
  };

  // conditions for validation
  const formValidation = (serverError) => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (serverError === 'Invalid Credential') {
      usernameErr.invalidCredential = 'Invalid Credential';
      passwordErr.invalidCredential = 'Invalid Credential';
      isValid = false;
    }

    if (username.trim().lenght < 5) {
      usernameErr.userNameLong = 'Username is too long';
      isValid = false;
    }

    if (username.trim().length > 10) {
      usernameErr.userNameLong = 'Username is too long';
      isValid = false;
    }

    if (username.trim().length === 0) {
      usernameErr.userNameRequired = 'Username is required';
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordErr.passwordShort = 'Password is too short';
      isValid = false;
    }

    if (password.trim().length > 10) {
      passwordErr.passwordLong = 'Password is too long';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordRequired = 'Password is required';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  // handles registering
  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(null);
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
            required
          />
          {Object.keys(usernameErr).map((key) => {
            return <div style={{ color: 'red' }}>{usernameErr[key]}</div>;
          })}
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
          {Object.keys(passwordErr).map((key) => {
            return <div style={{ color: 'red' }}>{passwordErr[key]}</div>;
          })}
        </Form.Group>

        <Button onClick={handleSubmit} variant='danger' type='submit' className='submit' >
          Submit
        </Button>
        <p>
          Dont have an account?
          <Button className="register" onClick={handleRegister} variant='link'>
            Register
          </Button>
        </p>
      </Form>
    </React.Fragment >
  );
}

// // static propTypes properties for LoginView
// LoginView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }),
//   onLoggedIn: PropTypes.func.isRequired,
//   onRegister: PropTypes.func,
// };