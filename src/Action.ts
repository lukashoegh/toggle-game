import * as Immutable from 'immutable';

export const emptyPayload = Immutable.Map<string, string>();
interface Action {
    type: symbol;
    payload: Immutable.Map<string, string>;
}
export default Action;
export const USER_INPUT = Symbol();
export const CONNECTION_INPUT = Symbol();