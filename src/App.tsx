import * as React from 'react';
import './App.css';
import LevelTitle from './LevelTitle';
import Level from './Level';
import LevelFooter from './LevelFooter';
import * as Immutable from 'immutable';
import { ControlConfig, isControlConfig, Visual, isVisual, getSubtype } from './Part';
import Container from './Container';
import * as Toggle from './Toggle';

interface P {
  level: Level;
}
type VisualTree = Immutable.Map<string | symbol, Immutable.List<Visual>>;
interface S {
  visualTree: VisualTree;
}

class App extends React.Component<P, S> {

  private topLevel = Symbol();
  private parentNames = Immutable.List<string | symbol>();

  constructor(props: P) {
    super(props);

    let visualTree = this.initializeVisualTree();
    this.parentNames.push(this.topLevel);

    for (let part of this.props.level.parts) {
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
    let empty = Immutable.Map<string | symbol, Immutable.List<Visual>>();
    return empty.set(this.topLevel, Immutable.List<Visual>());
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

}

export default App;
