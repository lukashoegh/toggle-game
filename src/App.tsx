import * as React from 'react';
import './App.css';
import Level from './Level';
import * as Immutable from 'immutable';
import { Part, partRegister } from './Part';
import LevelTitle from './LevelTitle';
import { Toggle } from './Parts/Toggle/Toggle';
import { Container } from './Parts/Container/Container';
import LevelFooter from './LevelFooter';

interface P {
  level: Level;
}
type VisualTree = Immutable.Map<string | symbol, Immutable.List<Part>>;
interface S {
  visualTree: VisualTree;
}

class App extends React.Component<P, S> {
  /*
    private parentNames = Immutable.List<string | symbol>();
  
    constructor(props: P) {
      super(props);
  
      let visualTree = this.initializeVisualTree();
      this.parentNames.push(topLevel);
      this.props.level.parts.map(this.InputPart);
  
      for (let inputPart of this.props.level.parts) {
  
  
  
  
  
        if (isControlConfig(part)) {
          if (isVisual(part)) {
            let parent: string | symbol = this.getParent(part);
            let children = visualTree.get(parent);
            children = children.push(part);
            visualTree = visualTree.set(parent, children);
          }
        }
      }
  
      this.state = {
        visualTree: visualTree
      };
    }
  
    public render() {
      let component = this.renderVisual({
        type: 'Visual.Container',
        name: this.topLevel
      });
      return (
        <div className="level">
          <LevelTitle title={this.props.level.title} author={this.props.level.author} />
          {component}
          <LevelFooter />
        </div>
      );
    }
  
    private initializeVisualTree(): VisualTree {
      let empty = Immutable.Map<string | symbol, Immutable.List<Part>>();
      return empty.set(topLevel, Immutable.List<Part>());
    }
  
    private renderVisual(visual: Visual): JSX.Element {
      let visualType = getSubtype(visual);
      switch (visualType) {
        case 'Container':
          let children: Immutable.List<JSX.Element>;
          if (visual.name !== undefined) {
            let childVisuals = this.state.visualTree.get(visual.name);
            children = childVisuals.map<JSX.Element>(this.renderVisual).toList();
          } else {
            children = Immutable.List<JSX.Element>();
          }
          return (
            <Container>
              {children}
            </Container>
          );
        case 'Toggle':
          let config = Object.assign(Toggle.DefaultConfig, visual);
          return 
        default:
          throw new Error('Part with unknown type: ' + visual.type);
      }
    }
  
    private getParent(part: ControlConfig): string | symbol {
      if (part.parent === undefined) {
        return this.topLevel;
      } else {
        if (this.parentNames.contains(part.parent)) {
          return part.parent;
        } else {
          throw new Error('A control referenced an invalid parent name: ' + (part.parent as string));
        }
      }
    }
  */
  render() {
    return (
      <div className="level">
        <LevelTitle title={this.props.level.title} author={this.props.level.author} />
        <Container.Component />
        <Toggle.Component />
        <LevelFooter />
      </div>
    );
  }
}

export default App;
