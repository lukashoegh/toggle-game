import Action from './Action';
import { Connection } from './Connection';

// constructor interface is in Part.ts
interface Logic {
    input: (action: Action) => void;
    registerConnection: (connection: Connection) => void;
}
export default Logic;