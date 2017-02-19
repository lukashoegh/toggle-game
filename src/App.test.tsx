import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import TestLevel from './TestLevel';

describe('Level GUI', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App level={new TestLevel()} />, div);
  });
  it('renders a title section', () => {
    
  });
});
