import * as React from 'react';
import './App.css';
import TestLevel from './TestLevel';
import LevelTitle from './LevelTitle';
import Level from './Level';
import LevelFooter from './LevelFooter';
import * as Immutable from 'immutable';
import { isControlConfig, ControlConfig } from './Part';

interface AppState {
  title: string;
  author: string;
  components: Immutable.Map<String, ControlConfig>;
}

class App extends React.Component<null, AppState> {

  constructor() {
    super();
    let level: Level = new TestLevel();
    this.setState({
      components: Immutable.Map<String, ControlConfig>({
        '__TOP': {
          type: 'Component.Container'
          
        }
      })
    });
    for(let part of level.parts) {
      if(isControlConfig(part)) {
        let typeTokens = part.type.split(".");
        if(typeTokens[0] == 'Component') {

        }
      }
      else {

      }
    }
  }
  
  render() {
    return (
      <div className="level">
        <LevelTitle title={this.state.title} author={this.state.author} />

        <LevelFooter />
      </div>
    );
  }
}

export default App;
