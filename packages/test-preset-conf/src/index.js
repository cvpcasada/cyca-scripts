import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>Test if react works</div>;
}

class Classy extends React.Component {
  #privateFld = { hello: 'world' };

  render() {
    return <div>{this.#privateFld.hello}</div>;
  }
}

(async () => {
  ReactDOM.render(<Classy />, document.getElementById('app'));
})();
