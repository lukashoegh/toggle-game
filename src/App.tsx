import * as React from 'react';
import './App.css';
import TestLevel from './TestLevel';
import LevelTitle from './LevelTitle';
import Level from './Level';
import LevelFooter from './LevelFooter';

class App extends React.Component<null, null> {

  private level: Level = new TestLevel();

  render() {
    return (
      <div className="level">
        <LevelTitle title={this.level.title} author={this.level.author} />
        
        <LevelFooter />
      </div>
    );
  }
}

export default App;
