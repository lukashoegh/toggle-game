import Logic from '../../Logic';
import Action from '../../Action';
import { Connection } from '../../Connection';
import { USER_INPUT } from '../../Action';
import * as Immutable from 'immutable';

export default class ButtonLogic implements Logic {

    private inputs: Immutable.List<string>;
    private outputs: Immutable.List<string>;

    constructor(
        private getConfig: (key: string) => string,
        private setConfig: (key: string, value: string) => void,
        private triggerConnection: (connection: Connection, payload: string) => void) {
        
        this.inputs = Immutable.List<string>(['toggle']);
        this.outputs = Immutable.List<string>(['toggle']);
    }
    public input(action: Action) {
        if (action.type === USER_INPUT) {
            this.toggleState();
            this.triggerOutputs();
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
        return;
    }

    private toggleState() {
        let state = (this.getConfig('state') === 'on') ? 'off' : 'on';
        this.setConfig('state', state);
    }

    private triggerOutputs() {
        return;
    }
}