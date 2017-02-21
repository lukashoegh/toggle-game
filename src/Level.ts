import { PartDescription } from './Part';
import { Connection } from './Connection';

interface Level {
    title: string;
    author: string;
    parts: Array<PartDescription | Connection>;
}

export default Level;