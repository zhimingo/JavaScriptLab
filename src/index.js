import React from 'react';
import ReactDOM from 'react-dom';

import MobxExampleApp from './mobx_example_app';

import './index.less';

function App() {
  return (
    <div className="app">
      <MobxExampleApp />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
