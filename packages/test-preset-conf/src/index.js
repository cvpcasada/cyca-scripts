import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Test if react works</div>
}


(async () => {
  ReactDOM.render(<App />, document.getElementById('app'));
})()