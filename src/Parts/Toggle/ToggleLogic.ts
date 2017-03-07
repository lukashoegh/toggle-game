import Logic from '../../Logic';

export default class ToggleLogic implements Logic {
    private state: number;
    constructor () {
        this.state = 1;
    }
}