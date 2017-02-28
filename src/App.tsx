import * as React from 'react';
import './App.css';
import Level from './Level';
import * as Immutable from 'immutable';
import { PartState, toPartState, topLevel } from './Part';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import { Container } from './Parts/Container/Container';
import { isPartDescription } from './Level';

// Component list:
import './Parts/Toggle/Toggle';
import './Parts/Container/Container';
import Action from './Action';
import * as _ from 'lodash';
import Logic from './Logic';

interface P {
  level: Level;
}
interface S {
  partStates: Immutable.List<PartState>;
}
class App extends React.Component<P, S> {

  private logics: Immutable.Map<number, Logic>;

  constructor(props: P) {
    super(props);
    this.initializeState();
    this.initializeLogics();
  }

  public render() {
    return (
      <div className="level">
        <LevelTitle title={this.props.level.title} author={this.props.level.author} />
        <Container.Component>
          {this.getChildren(topLevel)}
        </Container.Component>
        <LevelFooter />
      </div>
    );
  }

  public receiveAction(action: Action): void {
    this.logics.get(action.partId)
  }

  private initializeState() {
    this.state = { partStates: Immutable.List<PartState>() };
    for (let part of this.props.level.parts) {
      if (isPartDescription(part)) {
        let partState = toPartState(part);
        this.state = { partStates: this.state.partStates.push(partState) };
      }
    }
  }

  private initializeLogics() {

  }

  private getChildren(parent: string | symbol): Immutable.Iterable<number, JSX.Element> {
    return this.state.partStates.filter(
      (partState: PartState) => (partState.parent === parent)
    ).map(
      (partState: PartState) => this.getComponent(partState)
      );
  }

  private getComponent(partState: PartState): JSX.Element {
    let PartComponent = partState.type.Component;
    return (partState.type.canHaveChildren && partState.name !== undefined) ?
      <PartComponent key={partState.id} {...this.configAndDefaultProps(partState)}>
        {this.getChildren(partState.name)}
      </PartComponent> :
      <PartComponent key={partState.id} {...this.configAndDefaultProps(partState)} />;
  }

  private configAndDefaultProps(partState: PartState): Object {
    let res = partState.config.toObject();
    _.set(res, 'id', '' + partState.id);
    _.set(res, 'receiveAction', this.receiveAction);
    return res;
  }
}

export default App;