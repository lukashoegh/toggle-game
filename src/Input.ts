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

export class TurnOnInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;

  public receiveAction(action: Action, state: PartialState) {
    this.stateChange = emptyPartialState;
    if (state.get('state') === 'off') {
      this.stateChange = this.stateChange.set('state', 'on');
    }
  }
}

export class TurnOffInput implements Input {
  public relatedConfig = Immutable.Set(['state']);
  public stateChange = emptyPartialState;

  public receiveAction(action: Action, state: PartialState) {
    this.stateChange = emptyPartialState;
    if (state.get('state') === 'on') {
      this.stateChange = this.stateChange.set('state', 'off');
    }
  }
}

export class FromPayloadInput implements Input {
  public relatedConfig: Immutable.Set<string>;
  public stateChange = emptyPartialState;
  private falsyStrings = Immutable.List<string>(['off', 'false', '0', 'decrease']);

  constructor(
    private trueInput: Input,
    private falseInput: Input,
    private truePayload: any = '',
    private falsePayload: any = '',
  ) {
    this.updateRelatedConfig();
  }

  public receiveAction(action: Action, state: PartialState) {
    let asBoolean: boolean;
    switch (typeof action.payload) {
    case 'string':
      asBoolean = !(this.falsyStrings.contains(action.payload));
      break;
    case 'number':
      asBoolean = !(action.payload === 0);
      break;
    case 'boolean':
      asBoolean = action.payload;
      break;
    default:
      asBoolean = true;
    }
    let input = asBoolean ? this.trueInput : this.falseInput;
    action.payload = asBoolean ? this.truePayload : this.falsePayload;
    input.receiveAction(action, state);
    this.stateChange = input.stateChange;
    this.updateRelatedConfig();
  }

  private updateRelatedConfig() {
    this.relatedConfig = this.trueInput.relatedConfig.union(this.falseInput.relatedConfig);
  }
}

export class TrivialInput implements Input {
  public relatedConfig = Immutable.Set<string>();
  public stateChange = emptyPartialState;
  public receiveAction(action: Action, state: PartialState) {
    return;
  }
}

export class IncreaseInput implements Input {
  public relatedConfig: Immutable.Set<string>;
  public stateChange = emptyPartialState;
  constructor(
    private configField: string,
    private minValue: number,
    private maxValue: number,
    private wrap: boolean = false
  ) {
    this.relatedConfig = Immutable.Set<string>([this.configField]);
  }
  public receiveAction(action: Action, state: PartialState) {
    let value = (<number>state.get(this.configField));
    if (value < this.maxValue) {
      value++;
    }
    if (this.wrap && value === this.maxValue) {
      value = this.minValue;
    }
    this.stateChange = emptyPartialState.set(this.configField, value);
  }
}

export class DecreaseInput implements Input {
  public relatedConfig: Immutable.Set<string>;
  public stateChange = emptyPartialState;
  constructor(
    private configField: string,
    private minValue: number,
    private maxValue: number,
    private wrap: boolean = false
  ) {
    this.relatedConfig = Immutable.Set<string>([this.configField]);
  }
  public receiveAction(action: Action, state: PartialState) {
    let value = (<number>state.get(this.configField));
    if (value > this.minValue) {
      value--;
    }
    if (this.wrap && value === this.minValue) {
      value = this.maxValue;
    }
    this.stateChange = emptyPartialState.set(this.configField, value);
  }
}