export const controlTypes: Array<string> = [
    ''
];

export interface ControlConfig {
    type: string;
    parent?: string;
    name?: string;
}

export interface Connection {
    from: string;
    output: string;
    to: string;
    input: string;
}

export type Part = ControlConfig | Connection;

export function isConnection(part: Part): part is Connection {
    return (<Connection>part).from !== undefined;
}

export function isControlConfig(part: Part): part is ControlConfig {
    return(<ControlConfig>part).type !== undefined;
}