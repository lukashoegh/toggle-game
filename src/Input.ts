import * as Immutable from 'immutable';
import { PartialState, emptyPartialState } from './Logic';
import Action from './Action';

export interface Input {
  receiveAction: (action: Action, state: PartialState) => void;
  relatedConfig: Immutable.Set<string>;
  stateChange: PartialState;
}

export class ToggleInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;

  public receiveAction(action: Action, state: PartialState) {
    let newState = (state.get('state') === 'on') ? 'off' : 'on';
    this.stateChange = Immutable.Map({ state: newState });
  }
}

export class ToggleTurnOnInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;

  public receiveAction(action: Action, state: PartialState) {
    this.stateChange = emptyPartialState;
    if (state.get('state') === 'off') {
      this.stateChange = this.stateChange.set('state', 'on');
    }
  }
}

export class ToggleTurnOffInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;

  public receiveAction(action: Action, state: PartialState) {
    this.stateChange = emptyPartialState;
    if (state.get('state') === 'on') {
      this.stateChange = this.stateChange.set('state', 'off');
    }
  }
}

export class ToggleFromPayloadInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;
  private falsyStrings = Immutable.List<string>(['off', 'false', '0']);

  public receiveAction(action: Action, state: PartialState) {
    let newState = '';
    switch (typeof action.payload) {
      case 'string':
        newState = (this.falsyStrings.contains(action.payload)) ? 'off' : 'on';
        break;
      case 'number':
        newState = (action.payload === 0) ? 'off' : 'on';
        break;
      case 'boolean':
        newState = action.payload ? 'on' : 'off';
        break;
      default:
        newState = 'on';
    }
    this.stateChange = emptyPartialState;
    if (state.get('state') !== newState) {
      this.stateChange = this.stateChange.set('state', newState);
    }
  }
}

export class TrivialInput implements Input {
  public relatedConfig = Immutable.Set<string>();
  public stateChange = emptyPartialState;
  public receiveAction(action: Action, state: PartialState) { 
    return;
  }
}