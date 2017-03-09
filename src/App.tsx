import * as React from 'react';
import './App.css';
import Level from './Level';
import * as Immutable from 'immutable';
import { PartState, toPartState, topLevel, PartDescription } from './Part';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import Container from './Parts/Container/Container';
import { isPartDescription, isConnection } from './Level';
import Action from './Action';
import * as _ from 'lodash';
import Logic from './Logic';
import { Connection } from './Connection';
import { CONNECTION_INPUT } from './Action';

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
  private connections: Immutable.List<Connection>;
  private actionQueue: Immutable.List<Action>;
  private processingActionQueue: boolean;

  constructor(props: P) {
    super(props);
    this.initializeState();
    this.initializeLogics();
    this.initializeConnections();
    this.initializeActionQueue();
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
    this.actionQueue = this.actionQueue.unshift(action);
    if (!this.processingActionQueue) {
      this.processActionQueue();
    }
  }

  public getConfig(partId: number, key: string): string {
    let partState = this.state.partStates.get(partId);
    return partState.config.get(key);
  }

  public setConfig(partId: number, key: string, value: string): void {
    this.setState((prevState: S) => {
      let partState = prevState.partStates.get(partId);
      partState.config = partState.config.set(key, value);
      return prevState.partStates.set(partId, partState);
    });
  }

  private triggerConnection(connection: Connection, payload: string): void {
    let target = this.getPartStateByName(connection.to);
    let id: number;
    if (target !== undefined) {
      id = target.id;
    }
    else {
      throw new Error('Attempted to part with name: ' + connection.to
        + ', which should never happen, as the connection should have been validated on load');
    }
    let action: Action = {
      type: CONNECTION_INPUT,
      payload: Immutable.Map<string, string>({
        partId: id,
        input: connection.input,
        value: payload,
      })
    };
    this.receiveAction(action);
  }

  private initializeState() {
    this.state = { partStates: Immutable.Map<number, PartState>() };
    this.connections = Immutable.List<Connection>();
    for (let part of this.props.level.parts) {
      if (isPartDescription(part)) {
        this.initializePartState(part);
      } else if (isConnection(part)) {
        this.connections = this.connections.push(part);
      }
    }
  }

  private initializePartState(part: PartDescription) {
    let partState = toPartState(part);
    this.state = { partStates: this.state.partStates.set(partState.id, partState) };
  }

  private getPartStateByName(name: string): PartState | undefined {
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
        },
        this.triggerConnection
      );
      this.logics = this.logics.set(partState.id, logic);
    });
  }

  private initializeConnections() {
    this.connections.forEach(this.initializeConnection, this);
  }

  private initializeConnection(con: Connection) {
    let from = this.getPartStateByName(con.from);
    if (from === undefined) {
      throw new Error('You attempted to create a connection from the component: ' + con.from
        + ', which is an unknown component.');
    }
    let to = this.getPartStateByName(con.to);
    if (to === undefined) {
      throw new Error('You attempted to create a connection to the component: ' + con.to
        + ', which is an unknown component.');
    }
    this.logics.get(from.id).registerConnectionFrom(con);
    this.logics.get(to.id).registerConnectionTo(con);
  }

  private initializeActionQueue() {
    this.actionQueue = Immutable.List<Action>();
    this.processingActionQueue = false;
  }

  private processActionQueue() {
    this.processingActionQueue = !this.actionQueue.isEmpty();
    if (this.processingActionQueue) {
      let last = this.actionQueue.last();
      this.processAction(last);
      this.actionQueue = this.actionQueue.pop();
      this.processActionQueue();
    }
  }

  private processAction(action: Action) {
    let id = action.payload.get('partId');
    let logic = this.logics.get(parseInt(id, 10));
    logic.input(action);
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
      <PartComponent key={partState.id} {...this.configAndDefaultProps(partState) }>
        {this.getChildren(partState.name)}
      </PartComponent> :
      <PartComponent key={partState.id} {...this.configAndDefaultProps(partState) } />;
  }

  private configAndDefaultProps(partState: PartState): Object {
    let res = partState.config.toObject();
    _.set(res, 'receiveAction', (action: Action) => {
      action.payload = action.payload.set('partId', partState.id + '');
      this.receiveAction(action);
    });
    return res;
  }
}

export default App;