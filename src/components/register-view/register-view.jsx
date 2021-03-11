// myFlix-client/src/register-view/register-view.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// sytling
import { Button, Form, Row } from 'react-bootstrap';
import './register-view.scss';
import logo from '../../../public/images/logo.png';


// export RegisterView function component
export function RegisterView() {
  // hooks update function state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  // register function
  const handleRegister = (e) => {
    e.preventDefault();
    // sends request for authentication
    axios.post('https://theflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // '_self' to open page in current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Row className='register-form'>
      <Form>

        <img src={logo} className='logointro' />
        <p>
          Please register to continue.
        </p>

        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Enter Confirm Password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicBirthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter Birthday'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button
          onClick={handleRegister}
          variant='danger'
          type='submit'
          block>
          Register
        </Button>

        <p className='login-text'>
          Already have an account?
          <Link to={'/'}>
            <Button className="login" variant="link">
              Login here
            </Button>
          </Link>
        </p>

      </Form>
    </Row>
  );
}

RegisterView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};