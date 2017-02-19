import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import TestLevel from './TestLevel';

let level = new TestLevel();

let root = document.getElementById('root') as HTMLElement;

try {
  ReactDOM.render(
    <App level={level} />,
    root
  );
} catch (e) {
  ReactDOM.render(
    <div>Error: {e.message}</div>,
    root
  );
}