// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import { MainView } from './components/main-view/main-view';

// import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
    <Container>
      <MainView />
    </Container>
    )}
}

// find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);