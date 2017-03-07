import * as React from 'react';
import './App.css';
import Level from './Level';
import * as Immutable from 'immutable';
import { PartState, toPartState, topLevel } from './Part';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import Container from './Parts/Container/Container';
import { isPartDescription } from './Level';
import Action from './Action';
import * as _ from 'lodash';
import Logic from './Logic';

// Component list:
import './Parts/Toggle/Toggle';
import './Parts/Container/Container';

interface P {
  level: Level;
}
interface S {
  partStates: Immutable.Map<number, PartState>;
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
    this.logics.get(action.partId);
  }

  private initializeState() {
    this.state = { partStates: Immutable.Map<number, PartState>() };
    for (let part of this.props.level.parts) {
      if (isPartDescription(part)) {
        let partState = toPartState(part);
        this.state = { partStates: this.state.partStates.set(partState.id, partState) };
      }
    }
  }

  private getPartStateByName(name: string): PartState {
    return this.state.partStates.find(
      (partState: PartState) => (partState.name === name)
    ); 
  }

  private initializeLogics() {
    this.logics = Immutable.Map<number, Logic>();
    this.state.partStates.forEach((partState: PartState) => {
      let logic = partState.type.Logic(
        (key: string) => {
          return this.getConfig(partState.id, key);
        },
        (key: string, value: string) => {
          this.setConfig(partState.id, key, value);
        }
      );
      this.logics = this.logics.set(partState.id, logic);
    });
  }

  private getConfig(partId: number, key: string): string {
    let partState = this.state.partStates.get(partId);
    return partState.config.get(key);
  }

  private setConfig(partId: number, key: string, value: string): void {
    this.setState((prevState: S) => {
      let partState = prevState.partStates.get(partId);
      partState.config = partState.config.set(key, value);
      return prevState.partStates.set(partId, partState);
    });
  }

  private getChildren(parent: string | symbol): Immutable.Iterable<number, JSX.Element> {
    return this.state.partStates.filter(
      (partState: PartState) => (partState.parent === parent)
    ).toList().map(
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