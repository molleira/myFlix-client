// myFlix-client/src/registration-view/registration-view.jsx
import React, { useState } from 'react';

// import propTypes and Bootstrap components
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

// import styling and logo
import './registration-view.scss';
import logo from '../../../public/images/logo.png';


// export RegisterView
export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister('test');
  };

  axios.post('https://theflix.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

  return (
    <React.Fragment>
      <Form className='form-register'>
        <h1 className='text-danger'>Welcome to<span><img src={logo} className='logointro' /></span></h1>
        <p className='mb-5'>Please register to continue.</p>
        <Form.Group controlId='formBasicText'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
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
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder='Enter Birthday'
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant='danger' type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};