'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

function App() {
  return <div className='red'>Hello Webpack!!!</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
