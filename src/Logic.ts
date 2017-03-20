import Action from './Action';
import { Connection } from './Connection';
import * as Immutable from 'immutable';
import { Input, ToggleInput, ToggleTurnOnInput, ToggleTurnOffInput, ToggleFromPayloadInput } from './Input';

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

  private inputs: Immutable.Map<string, Input>;
  private outputs: Immutable.List<string>;
  private connections: Immutable.List<Connection>;
  private payload: any;
  private userInput: string;

  constructor(
    private callbacks: LogicCallbacks,
  ) {
    this.inputs = Immutable.Map<string, Input>({
      toggle: new ToggleInput(callbacks),
      turnOn: new ToggleTurnOnInput(callbacks),
      turnOff: new ToggleTurnOffInput(callbacks),
      fromPayload: new ToggleFromPayloadInput(callbacks),
    });
    this.outputs = Immutable.List<string>(['toggle']);
    this.connections = Immutable.List<Connection>();
    this.userInput = 'toggle';
  }
  public input(action: Action) {
    let input = this.getInput(action.connection.input);
    input.receiveAction(action);
    this.payload = input.generatedPayload;
    if (action.connection.input === 'fromUser') {
      this.triggerConnections();
    }
  }

  public hasInput(name: string): boolean {
    return this.inputs.has(name);
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

  private getInput(name: string): Input {
    if (name === 'fromUser') {
      name = this.userInput;
    }
    let input = this.inputs.get(name);
    if (input === undefined) {
      throw new Error('Attempted to use input ' + name + ', on a logic that has no such input');
    }
    else {
      return input;
    }
  }
}