import * as React from 'react';
import Logic from './Logic';
import * as Immutable from 'immutable';

export interface PartDescription {
    type: string;
    name?: string;
    parent?: string;
    [other: string]: undefined | string;
}

export interface Part {
    readonly Logic: typeof Logic;
    readonly Component: typeof React.Component;
    readonly defaultConfig: Immutable.Map<string, string>;
}

export const topLevel = Symbol();

export interface PartState {
    id: number;
    type: Part;
    name?: symbol | string;
    parent: symbol | string;
    config: Immutable.Map<string, string>;
}

export let partRegister = Immutable.Map<string, Part>();
export function registerPart(name: string, part: Part): void {
    partRegister = partRegister.set(name, part);
}

let nextId: number = 0;
export function toPartState(partDescription: PartDescription): PartState {
    // initialize type
    let typeString = partDescription.type.toLowerCase();
    let typePart = partRegister.get(typeString);
    if (typePart === undefined) {
        throw new Error('The type ' + partDescription.type + ' is unrecognized.');
    }
    let res: PartState = {
        id: nextId,
        type: typePart,
        parent: topLevel,
        config: Immutable.Map<string, string>()
    };

    // copy parent and name
    if (partDescription.name !== undefined) {
        res.name = partDescription.name.toLowerCase();
    }
    if (partDescription.parent !== undefined) {
        res.parent = partDescription.parent.toLowerCase();
    }

    // create config map
    res.config = typePart.defaultConfig;
    
    nextId++;
    return res;
}