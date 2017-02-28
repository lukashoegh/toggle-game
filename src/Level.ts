import { PartDescription } from './Part';
import { Connection } from './Connection';

interface Level {
    title: string;
    author: string;
    parts: Array<PartDescription | Connection>;
}

export function isPartDescription(input: PartDescription | Connection): input is PartDescription {
    return (<PartDescription> input).type !== undefined;
}
export function isConnection(input: PartDescription | Connection): input is Connection {
    return (<Connection> input).to !== undefined;
}

export default Level;