import { PartState } from './Part';
export interface Connection {
    from: string | symbol;
    output: string;
    to: string | symbol;
    input: string;
}

interface StringConnection extends Connection {
    from: string;
    output: string;
    to: string;
    input: string;
}
export function toAndFromAreStrings(connection: Connection): connection is StringConnection {
    if (typeof connection.from === 'string') {
        return typeof connection.to === 'string';
    }
    return false;
}

export interface ConnectionDescription {
    from?: string;
    output?: string;
    to: string;
    input?: string;
}

export function toConnection(
    connection: ConnectionDescription,
    getPartState: (name: string | symbol) => PartState,
    lastPart?: string | symbol
): Connection {
    let from, to: string | symbol;
    let input, output: string;
    if (connection.from !== undefined) {
        from = connection.from;
    }
    else if (lastPart !== undefined) {
        from = lastPart;
    }
    else {
        throw new Error('A connection without a from propperty was input before the first part, which is disallowed.');
    }
    if (connection.to !== undefined) {
        to = connection.to;
    }
    else {
        throw new Error('A connection without a to propperty is not allowed.');
    }
    let partState = getPartState(connection.to);
    if (partState === undefined) {
        throw new Error('Attempted to connected to the part: ' + connection.to + ', which was not yet defined');
    }
    output = (connection.output !== undefined) ? connection.output : getPartState(from).type.defaultOutput;
    input = (connection.input !== undefined) ? connection.input : getPartState(to).type.defaultInput;
    return {
        from: from,
        output: output,
        to: to,
        input: input
    };
}