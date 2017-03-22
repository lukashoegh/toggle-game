import { PartialState } from './Logic';
export interface Output {
  shouldTrigger: (oldState: PartialState, stateChange: PartialState) => boolean;
  payload: any;
}

export class ToggleOutput implements Output {
  public payload: any;
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    this.payload = stateChange.get('state');
    return !stateChange.isEmpty();
  }
}

export class TurnOnOutput implements Output {
  public payload = 'on';
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    return stateChange.get('state') === 'on';
  }
}

export class TurnOffOutput implements Output {
  public payload = 'off';
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    return stateChange.get('state') === 'off';
  }
}

export class UnconditionalOutput implements Output {
  constructor (public payload: string | number) {}
  public shouldTrigger () {
    return true;
  }
}

export class IncreaseOutput implements Output {
  public payload = 'increase';
  constructor(private minValue: number, private maxValue: number, private wrap: boolean = true) {}
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    let oldValue = oldState.get('value');
    let newValue = stateChange.get('value');
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      if (newValue - oldValue === 1) {
        return true;
      }
      else {
        return (newValue === this.minValue && oldValue === this.maxValue && this.wrap);
      }
    }
    return false;
  }
}

export class DecreaseOutput implements Output {
  public payload = 'decrease';
  constructor(private minValue: number, private maxValue: number, private wrap: boolean = false) {}
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    let oldValue = oldState.get('value');
    let newValue = stateChange.get('value');
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      if (newValue - oldValue === -1) {
        return true;
      }
      else {
        return (newValue === this.maxValue && oldValue === this.minValue && this.wrap);
      }
    }
    return false;
  }
}

export class IncreaseDecreaseOutput implements Output {
  public payload = '';
  constructor(private minValue: number, private maxValue: number, private wrap: boolean = false) {}
  public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
    let oldValue = oldState.get('value');
    let newValue = stateChange.get('value');
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      if (newValue - oldValue === -1 || (newValue === this.maxValue && oldValue === this.minValue && this.wrap)) {
        this.payload = 'decrease';
        return true;
      }
      else if (newValue - oldValue === 1 || (newValue === this.minValue && oldValue === this.maxValue && this.wrap)) {
        this.payload = 'increase';
        return true;
      }
    }
    return false;
  }
}