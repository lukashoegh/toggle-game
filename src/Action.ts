import { Connection } from './Connection';

interface Action {
    connection: Connection;
    payload: any;
    isFromUser: boolean;
}
export default Action;