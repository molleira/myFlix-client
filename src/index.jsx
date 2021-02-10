// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

// redux store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// bootstrap container
import Container from 'react-bootstrap/Container';

// MainView and reducers
import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

// creates the store
const store = createStore(moviesApp, devToolsEnhancer());

// main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <MainView />
        </Provider>
      </Container>
    )
  }
}

// find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);