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

    constructor(
        private callbacks: LogicCallbacks,
    ) {
        this.inputs = Immutable.List<string>(['toggle']);
        this.outputs = Immutable.List<string>(['toggle']);
        this.connections = Immutable.List<Connection>();
    }
    public input(action: Action) {
        if (action.isFromUser) {
            this.toggleState();
            this.triggerOutputs();
        }
        else {
            this.toggleState();
        }
    }

    public hasInput(name: string): boolean {
        return this.inputs.contains(name);
    }

    public hasOutput(name: string): boolean {
        return this.outputs.contains(name);
    }

    public registerConnectionTo(connection: Connection) {
        return;
    }
    public registerConnectionFrom(connection: Connection) {
        this.connections = this.connections.push(connection);
    }

    private toggleState() {
        let state = (this.callbacks.getConfig('state') === 'on') ? 'off' : 'on';
        this.callbacks.setConfig('state', state);
    }

    private triggerOutputs() {
        this.connections.forEach((connection: Connection) => {
            let payload = this.callbacks.getConfig('state') === 'on';
            this.callbacks.receiveAction({
                connection: connection,
                payload: payload,
                isFromUser: false
            });
        });
    }
}