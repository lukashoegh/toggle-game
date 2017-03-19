import * as React from 'react';
import './App.css';
import * as Immutable from 'immutable';
import { PartState, toPartState, topLevel, PartDescription, DefaultProps } from './Part';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import Container from './Parts/Container/Container';
import { isPartDescription, isConnectionDescription, LevelContextualDescription, 
  LevelDescription, decontextualizeLevelDescription } from './Level';
import Action from './Action';
import * as _ from 'lodash';
import { Connection, toConnection, ConnectionDescription } from './Connection';
import './Parts/PartList';
import { LogicCallbacks, Logic } from './Logic';

interface P {
  level: LevelContextualDescription;
}
interface S {
  partStates: Immutable.OrderedMap<string | symbol, PartState>;
}
class App extends React.Component<P, S> {

  private logics: Immutable.Map<string | symbol, Logic>;
  private connectionDescriptions: Immutable.List<ConnectionDescription>;
  private actionQueue: Immutable.List<Action>;
  private processingActionQueue: boolean;
  private levelDescription: LevelDescription;

  constructor(props: P) {
    super(props);
    this.generateLevelDescription();
    this.initializeState();
    this.initializeLogics();
    this.initializeConnections();
    this.initializeActionQueue();
  }

  public render() {
    return (
      <div className="level">
        <LevelTitle title={this.props.level.title} author={this.props.level.author} />
        <Container.Component {...Container.defaultConfig.toObject() }>
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

  public getConfig(name: string | symbol, key: string): string | number {
    let partState = this.state.partStates.get(name);
    return partState.config.get(key);
  }

  public setConfig(name: string | symbol, key: string, value: string | number): void {
    this.setState((prevState: S) => {
      let partState = prevState.partStates.get(name);
      partState.config = partState.config.set(key, value);
      return prevState.partStates.set(name, partState);
    });
  }

  private generateLevelDescription() {
    this.levelDescription = decontextualizeLevelDescription(this.props.level);
  }

  private initializeState() {
    this.state = { partStates: Immutable.OrderedMap<string | symbol, PartState>() };
    this.connectionDescriptions = Immutable.List<Connection>();
    for (let part of this.levelDescription.parts) {
      if (isPartDescription(part)) {
        this.initializePartState(part);
      } else if (isConnectionDescription(part)) {
        this.connectionDescriptions = this.connectionDescriptions.push(part);
      }
    }
  }

  private initializePartState(part: PartDescription) {
    let partState = toPartState(part);
    if (typeof partState.name === 'string' && this.state.partStates.get(partState.name) !== undefined) {
      throw new Error('Attempted to create a part with name: ' 
        + partState.name + ', but a part with this name already exists.');
    }
    this.state = { partStates: this.state.partStates.set(partState.name, partState) };
  }

  private getPartStateByName(name: string | symbol): PartState | undefined {
    return this.state.partStates.find(
      (partState: PartState) => (partState.name === name)
    );
  }

  private initializeLogics() {
    this.logics = Immutable.Map<string | symbol , Logic>();
    this.state.partStates.forEach((partState: PartState) => {
      let logic = partState.type.Logic({
        getConfig: (key: string) => {
          return this.getConfig(partState.name, key);
        },
        setConfig: (key: string, value: string | number) => {
          this.setConfig(partState.name, key, value);
        },
        receiveAction: (action: Action) => this.receiveAction(action)
      } as LogicCallbacks);
      this.logics = this.logics.set(partState.name, logic);
    });
  }

  private initializeConnections() {
    this.connectionDescriptions.forEach(this.initializeConnection, this);
  }

  private initializeConnection(connectionDescription: ConnectionDescription) {
    let connection = toConnection(connectionDescription, (name: string | symbol) => this.getPartStateByName(name));
    let from = this.getPartStateByName(connection.from);
    if (from === undefined) {
      throw new Error('from was undefined, even after it was validated by toConnection, which should not happen');
    }
    let logic = this.logics.get(from.name);
    if (!logic.hasOutput(connection.output)) {
      throw new Error('You attempted to create a connection from the output: ' + connection.output
        + ', which does not exist on the component type ' + from.type.Component.name + '.');
    }
    logic.registerConnectionFrom(connection);
    let to = this.getPartStateByName(connection.to);
    if (to === undefined) {
      throw new Error('to was undefined, even after it was validated by toConnection, which should not happen');
    }
    logic = this.logics.get(to.name);
    if (!logic.hasInput(connection.input)) {
      throw new Error('You attempted to create a connection to the input: ' + connection.input
        + ', which does not exist on the component type ' + to.type.Component.name + '.');
    }
    logic.registerConnectionTo(connection);
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
    let toName = action.connection.to;
    let partState = this.getPartStateByName(toName);
    if (partState === undefined) {
      let toString = (typeof toName === 'string') ? toName : 'undefined';
      throw new Error('Tried to process an action whose connections to field was ' 
      + toString + ' which is not allowed');
    }
    let logic = this.logics.get(partState.name);
    logic.input(action);
  }

  private getChildren(parent: string | symbol): Immutable.Iterable<number, JSX.Element> {
    return this.state.partStates.filter(
      (partState: PartState) => (partState.parent === parent)
    )
      .toList()
      .map(
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
    let config = partState.config.toObject();
    let defaultProps: DefaultProps = {
      receivePayload: (payload?: any) => {
        let connection: Connection = {
          from: '',
          output: '',
          to: partState.name,
          input: 'user'
        };
        let action: Action = {
          connection: connection,
          payload: payload
        };
        this.receiveAction(action);
      }
    };
    return _.assignIn(config, defaultProps);
  }
}

export default App;