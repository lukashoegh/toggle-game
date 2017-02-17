import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

describe('Level GUI', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('renders a title section', () => {
    
  });
});
