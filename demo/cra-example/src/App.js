import React from 'react';
import logo from './logo.svg';
import './App.css';

const LazyDiv = React.lazy(() => import(/* webpackChunkName: "Div" */ 'common/Div'));

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <LazyDiv className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </LazyDiv>

    </React.Suspense>
  );
}

export default App;
