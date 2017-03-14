import Action from './Action';
import { Connection } from './Connection';

// constructor interface is in Part.ts
interface Logic {
    input: (action: Action) => void;
    registerConnectionFrom: (connection: Connection) => void;
    registerConnectionTo: (connection: Connection) => void;
    hasInput: (name: string) => boolean;
    hasOutput: (name: string) => boolean;
}
export default Logic;