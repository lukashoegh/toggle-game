import { PartDescription } from './Part';
import { ConnectionDescription } from './Connection';

type Description = PartDescription | ConnectionDescription;

interface Level {
    title: string;
    author: string;
    parts: Array<Description>;
}

export function isPartDescription(input: Description): input is PartDescription {
    return (<PartDescription> input).type !== undefined;
}
export function isConnectionDescription(input: Description): input is ConnectionDescription {
    return (<ConnectionDescription> input).to !== undefined;
}

export default Level;