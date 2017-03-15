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