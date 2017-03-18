import { PartDescription, PartContextualDescription } from './Part';
import { ConnectionContextualDescription, ConnectionDescription } from './Connection';

export type Description = PartDescription | ConnectionDescription;
export type ContextualDescription = PartContextualDescription | ConnectionContextualDescription;

export interface LevelDescription {
    title: string;
    author: string;
    parts: Array<Description>;
}

export interface LevelContextualDescription {
    title: string;
    author: string;
    parts: Array<ContextualDescription>;
}

let backlog = Array<ConnectionDescription>();
export function decontextualizeLevelDescription(level: LevelContextualDescription): LevelDescription {
    let res: LevelDescription = {
        title: level.title,
        author: level.author,
        parts: new Array<Description>(),
    };
    let previousName: string | symbol | undefined;
    for (let contextualDescription of level.parts) {
        if (isPartContextualDescription(contextualDescription)) {
            let name = (contextualDescription.name !== undefined) ? contextualDescription.name : Symbol();
            contextualDescription.name = '';
            let part: PartDescription = <PartDescription> contextualDescription;
            part.name = name;
            previousName = name;
            processBacklog(name, res);
            res.parts.push(part);
        }
        else  {
            let connection: ConnectionDescription = {
                from: '',
                output: contextualDescription.output,
                to: '',
                input: contextualDescription.input,
            };
            if (contextualDescription.from !== undefined) {
                connection.from = contextualDescription.from;
            }
            else if (previousName !== undefined) {
                connection.from = previousName;
            }
            else {
                throw new Error('Tried to parse a connection without a from field, before the first part.');
            }
            if (contextualDescription.to !== undefined) {
                connection.to = contextualDescription.to;
                res.parts.push(connection);
            }
            else {
                addToBacklog(connection);
            }
        }
    }
    if (backlog.length !== 0) {
        throw new Error('Tried to parse a connection without a to field, after the last part.');
    }
    return res;
}
function addToBacklog(connection: ConnectionDescription) {
    backlog.push(connection);
}
function processBacklog(nextName: string | symbol, level: LevelDescription) {
    for (let connection of backlog) {
        connection.to = nextName;
        level.parts.push(connection);
    }
    backlog = [];
}

export function isPartDescription(input: Description): input is PartDescription {
    return (<PartDescription> input).type !== undefined;
}
export function isConnectionDescription(input: Description): input is ConnectionDescription {
    return !isPartDescription(input);
}

export function isPartContextualDescription(input: ContextualDescription): input is PartContextualDescription {
    return (<PartDescription> input).type !== undefined;
}
export function isConnectionContextualDescription(input: ContextualDescription)
: input is ConnectionContextualDescription {
    return !isPartContextualDescription(input);
}