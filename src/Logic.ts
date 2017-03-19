import Action from './Action';
import { Connection } from './Connection';
import * as Immutable from 'immutable';

// constructor interface is in Part.ts
export interface Logic {
  input: (action: Action) => void;
  registerConnectionFrom: (connection: Connection) => void;
  registerConnectionTo: (connection: Connection) => void;
  hasInput: (name: string) => boolean;
  hasOutput: (name: string) => boolean;
}

export interface LogicCallbacks {
  getConfig: (key: string) => string | number;
  setConfig: (key: string, value: string) => void;
  receiveAction: (action: Action) => void;
}

export class GenericLogic implements Logic {

  private inputs: Immutable.List<string>;
  private outputs: Immutable.List<string>;
  private connections: Immutable.List<Connection>;
  private payload: any;
  constructor(
    private callbacks: LogicCallbacks,
  ) {
    this.inputs = Immutable.List<string>(['toggle']);
    this.outputs = Immutable.List<string>(['toggle']);
    this.connections = Immutable.List<Connection>();
  }
  public input(action: Action) {
    let currentState = this.callbacks.getConfig('state');
    switch (action.connection.input) {
      case 'toggle':
      case 'fromUser':
        this.payload = (currentState === 'on') ? 'off' : 'on';
        break;
      case 'turnOn':
        this.payload = 'on';
        break;
      default:
        throw new Error('Unexpected input: ' + action.connection.input);
    }
    if (currentState !== this.payload) {
      this.callbacks.setConfig('state', this.payload);
    }
    if (action.connection.input === 'fromUser') {
      this.triggerConnections();
    }
  }

  public hasInput(name: string): boolean {
    return true;
  }

  public hasOutput(name: string): boolean {
    return true;
  }

  public registerConnectionTo(connection: Connection) {
    return;
  }
  public registerConnectionFrom(connection: Connection) {
    this.connections = this.connections.push(connection);
  }

  private triggerConnections() {
    this.connections.forEach((connection: Connection) => {
      this.callbacks.receiveAction({
        payload: this.payload,
        connection: connection,
      });
    });
  }
}