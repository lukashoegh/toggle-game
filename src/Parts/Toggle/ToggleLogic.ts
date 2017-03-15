import Logic from '../../Logic';
import Action from '../../Action';
import { Connection } from '../../Connection';
import * as Immutable from 'immutable';

export default class ToggleLogic implements Logic {

    private inputs: Immutable.List<string>;
    private outputs: Immutable.List<string>;
    private connections: Immutable.List<Connection>;

    constructor(
        private getConfig: (key: string) => string,
        private setConfig: (key: string, value: string) => void,
        private receiveAction: (action: Action) => void) {

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
        let state = (this.getConfig('state') === 'on') ? 'off' : 'on';
        this.setConfig('state', state);
    }

    private triggerOutputs() {
        this.connections.forEach((connection: Connection) => {
            let payload = this.getConfig('state') === 'on';
            this.receiveAction({
                connection: connection,
                payload: payload,
                isFromUser: false
            });
        });
    }
}