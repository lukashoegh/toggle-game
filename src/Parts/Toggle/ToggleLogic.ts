import Logic from '../../Logic';
import Action from '../../Action';
import { Connection } from '../../Connection';
import { USER_INPUT } from '../../Action';

export default class ToggleLogic implements Logic {

    constructor(
        private getConfig: (key: string) => string,
        private setConfig: (key: string, value: string) => void,
        private triggerConnection: (connection: Connection, payload: string) => void) {
    }
    public input(action: Action) {
        if (action.type === USER_INPUT) {
            this.toggleState();
            this.triggerOutputs();
        }
    }

    private toggleState() {
        let state = (this.getConfig('state') === 'on') ? 'off' : 'on';
        this.setConfig('state', state);
    }

    private triggerOutputs() {
        return true;
    }
}