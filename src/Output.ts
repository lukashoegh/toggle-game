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

export class ToggleToOnOutput implements Output {
    public payload = 'on';
    public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
        return stateChange.get('state') === 'on';
    }
}

export class ToggleToOffOutput implements Output {
    public payload = 'off';
    public shouldTrigger (oldState: PartialState, stateChange: PartialState) {
        return stateChange.get('state') === 'off';
    }
}