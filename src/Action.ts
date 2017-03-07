import * as Immutable from 'immutable';
interface Action {
    type: symbol;
    payload?: Immutable.Map<string, string>;
}
export default Action;

export const USER_INPUT = Symbol();