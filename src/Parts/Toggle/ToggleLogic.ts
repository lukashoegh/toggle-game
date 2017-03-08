import Logic from '../../Logic';
import Action from '../../Action';
import { Connection } from '../../Connection';

export default class ToggleLogic implements Logic {

    constructor(
        private getConfig: (key: string) => string,
        private setConfig: (key: string, value: string) => void,
        private triggerConnection: (connection: Connection, payload: string) => void) {
    }
    public input(action: Action) {

    }
}