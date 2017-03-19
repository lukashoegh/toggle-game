import { Connection } from './Connection';

interface Action {
    connection: Connection;
    payload?: any;
}
export default Action;