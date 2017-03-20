import Action from './Action';
import { Connection } from './Connection';
import * as Immutable from 'immutable';
import { Input, ToggleInput, ToggleTurnOnInput, ToggleTurnOffInput, ToggleFromPayloadInput } from './Input';
import { Output, ToggleOutput } from './Output';

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
  setConfig: (key: string, value: string | number) => void;
  receiveAction: (action: Action) => void;
}

export type PartialState = Immutable.Map<string, string | number>;
export const emptyPartialState = Immutable.Map<string, string | number>();

export class GenericLogic implements Logic {

  private inputs: Immutable.Map<string, Input>;
  private outputs: Immutable.Map<string, Output>;
  private connections: Immutable.List<Connection>;
  private userInput: string;

  constructor(
    private callbacks: LogicCallbacks,
  ) {
    this.inputs = Immutable.Map<string, Input>({
      toggle: new ToggleInput(),
      turnOn: new ToggleTurnOnInput(),
      turnOff: new ToggleTurnOffInput(),
      fromPayload: new ToggleFromPayloadInput(),
    });
    this.outputs = Immutable.Map<string, Output>({
      toggled: new ToggleOutput(),
      turnedOn: new ToggleTurnOnInput(),
      turnedOff: new ToggleTurnOffInput(),
    });
    this.userInput = 'toggle';
    this.connections = Immutable.List<Connection>();
  }
  public input(action: Action) {
    let input = this.getInput(action.connection.input);
    let state = this.getPartialState(input.relatedConfig);
    input.receiveAction(action, state);
    let stateChange = input.stateChange;
    if (!stateChange.isEmpty()) {
      this.applyPartialState(stateChange);
      if (action.connection.input === 'fromUser') {
        this.triggerConnections(state, stateChange);
      }
    }
  }

  public hasInput(name: string): boolean {
    return this.inputs.has(name);
  }

  public hasOutput(name: string): boolean {
    return this.outputs.has(name);
  }

  public registerConnectionTo(connection: Connection) {
    let input = this.getInput(connection.input);
    let state = this.getPartialState(input.relatedConfig);
    input.receiveAction({ connection: connection, payload: '' }, state);
  }
  public registerConnectionFrom(connection: Connection) {
    this.connections = this.connections.push(connection);
  }

  private triggerConnections(oldState: PartialState, stateChange: PartialState) {
    this.connections.forEach((connection: Connection) => {
      let output = this.getOutput(connection.output);
      if (output.shouldTrigger(oldState, stateChange)) {
        this.callbacks.receiveAction({
          payload: output.payload,
          connection: connection,
        });
      }
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
  private getOutput(name: string): Output {
    let output = this.outputs.get(name);
    if (output === undefined) {
      throw new Error('Attempted to use output ' + name + ', on a logic that has no such output');
    }
    else {
      return output;
    }
  }

  private getPartialState(relatedConfig: Immutable.Set<string>): PartialState {
    let state = emptyPartialState;
    relatedConfig.forEach((field: string) => {
      state = state.set(field, this.callbacks.getConfig(field));
    });
    return state;
  }
  private applyPartialState(state: PartialState) {
    state.forEach((value: string | number, key: string) => {
      this.callbacks.setConfig(key, value);
    });
  }
}