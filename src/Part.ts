export interface Control {
    type: string;
    parent?: string | symbol;
    name?: string | symbol;
}

export interface Config {
    size?: string;
}

export type ControlConfig = Control & Config;

export get

export interface Visual extends ControlConfig { }
export interface Logic extends ControlConfig { }

export function isVisual(c: ControlConfig): c is Visual {
    return (c.type.split('.')[0] === 'Visual');
}
export function isLogic(c: ControlConfig): c is Logic {
    return (c.type.split('.')[0] === 'Logic');
}
export function getSubtype(c: ControlConfig): string {
    return (c.type.split('.')[1]);
}

export interface Connection {
    from: string;
    output: string;
    to: string;
    input: string;
}

export type Part = ControlConfig | Connection;

export function isConnection(part: Part): part is Connection {
    return (<Connection> part).from !== undefined;
}

export function isControlConfig(part: Part): part is ControlConfig {
    return (<ControlConfig> part).type !== undefined;
}