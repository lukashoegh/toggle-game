import Action from './Action';
import * as Immutable from 'immutable';
export interface Input {
    receiveAction: (action: Action) => void;
    generatedPayload?: any;
}

export interface InputCallbacks {
  getConfig: (key: string) => string | number;
  setConfig: (key: string, value: string) => void;
}

export class ToggleInput implements Input {
    public generatedPayload: any;
    constructor(private callbacks: InputCallbacks) {}
    public receiveAction(action: Action) {
        let currentState = this.callbacks.getConfig('state');
        this.generatedPayload = (currentState === 'on') ? 'off' : 'on';
        this.callbacks.setConfig('state', this.generatedPayload);
    }
}

export class ToggleTurnOnInput implements Input {
    public generatedPayload = 'on';
    constructor(private callbacks: InputCallbacks) {}
    public receiveAction(action: Action) {
        this.callbacks.setConfig('state', 'on');
    }
}

export class ToggleTurnOffInput implements Input {
    public generatedPayload = 'off';
    constructor(private callbacks: InputCallbacks) {}
    public receiveAction(action: Action) {
        this.callbacks.setConfig('state', 'off');
    }
}

export class ToggleFromPayloadInput implements Input {
    public generatedPayload: any;
    private falsyStrings = Immutable.List<string>(['off', 'false', '0']);
    constructor(private callbacks: InputCallbacks) {}
    public receiveAction(action: Action) {
        switch (typeof action.payload) {
            case 'string':
                this.generatedPayload = (this.falsyStrings.contains(action.payload)) ? 'off' : 'on';
                break;
            case 'number':
                this.generatedPayload = (action.payload === 0) ? 'off' : 'on';
                break;
            case 'boolean':
                this.generatedPayload = action.payload ? 'on' : 'off';
                break;
            default:
                this.generatedPayload = 'on';
        }
        this.callbacks.setConfig('state', this.generatedPayload);
    }
}