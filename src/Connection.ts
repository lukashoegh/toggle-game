import { PartState } from './Part';
import { toString } from './Util';
export interface Connection {
  from: string | symbol;
  output: string;
  to: string | symbol;
  input: string;
  id?: number;
}

export interface ConnectionContextualDescription {
  from?: string;
  output?: string;
  to?: string;
  input?: string;
}
export interface ConnectionDescription {
  from: string | symbol;
  output?: string;
  to: string | symbol;
  input?: string;
}

let id = 0;
/**
 * Convert ConnectionDescription to Connection and validate its to and from fields
 * @param connection
 * @param getPartState 
 */
export function toConnection(
  connection: ConnectionDescription,
  getPartState: (name: string | symbol) => PartState | undefined,
): Connection {
  let fromPart = getPartState(connection.from);
  let toPart = getPartState(connection.to);
  if (fromPart === undefined) {
    throw new Error('Attempted to connected from the part: ' + toString(connection.from)
      + ', which was not defined');
  }
  if (fromPart.type.defaultInput === '') {
    throw new Error('Attempted to connected from the part: ' + toString(connection.to)
      + ', which has no outputs');
  }
  if (toPart === undefined) {
    throw new Error('Attempted to connected to the part: ' + toString(connection.to)
      + ', which was not defined');
  }
  if (toPart.type.defaultInput === '') {
    throw new Error('Attempted to connected to the part: ' + toString(connection.to)
      + ', which has no inputs');
  }
  id++;
  return {
    from: connection.from,
    to: connection.to,
    output: (connection.output !== undefined) ? connection.output : fromPart.type.defaultOutput,
    input: (connection.input !== undefined) ? connection.input : toPart.type.defaultInput,
    id: id,
  };
}