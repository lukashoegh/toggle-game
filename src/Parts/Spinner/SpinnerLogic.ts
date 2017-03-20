import Action from '../../Action';
import { Connection } from '../../Connection';
import * as Immutable from 'immutable';
import { Logic } from '../../Logic';

export default class SpinnerLogic implements Logic {

    private inputs: Immutable.List<string>;
    private outputs: Immutable.List<string>;
    private connections: Immutable.List<Connection>;

    constructor(
        private getConfig: (key: string) => string | number,
        private setConfig: (key: string, value: string | number) => void,
        private receiveAction: (action: Action) => void) {

        this.inputs = Immutable.List<string>(['toggle']);
        this.outputs = Immutable.List<string>(['toggle']);
        this.connections = Immutable.List<Connection>();
    }
    public input(action: Action) {
        if (action.connection.input === 'fromUser') {
            this.changeRotation(action.payload);
            this.triggerOutputs();
        }
        else {
            this.changeRotation(action.payload);
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

    private changeRotation(payload: any) {
        let rotation = (<number> this.getConfig('rotation')) + ((payload === 'up') ? -1 : 1);
        this.setConfig('rotation', rotation);
    }

    private triggerOutputs() {
        this.connections.forEach((connection: Connection) => {
            let payload = this.getConfig('state') === 'on';
            this.receiveAction({
                connection: connection,
                payload: payload,
            });
        });
    }
}