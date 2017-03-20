import * as React from 'react';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { defensiveParseInt } from './Util';
import { LogicCallbacks, Logic } from './Logic';

export interface PartContextualDescription {
    type: string;
    name?: string;
    parent?: string;
    [other: string]: undefined | string | number;
}

export interface PartDescription {
    type: string;
    name: string | symbol;
    parent?: string;
    [other: string]: undefined | string | symbol | number;
}

// special fields
export const fullTextField = Symbol();

export interface DefaultProps {
    receivePayload: (payload?: any) => void;
}

export interface Part {
    readonly Logic: (callbacks: LogicCallbacks) => Logic;
    readonly Component: typeof React.Component;
    readonly specification: Specification;
    readonly defaultConfig: Immutable.Map<string, string>;
    readonly canHaveChildren: boolean;
    readonly defaultOutput: string;
    readonly defaultInput: string;
}

function isSet(s: Immutable.Set<string | number> | symbol): s is Immutable.Set<string | number> {
    return ((<Immutable.Set<string | number>> s).contains !== undefined);
}

export type Specification = Immutable.Map<string, Immutable.Set<string | number> | symbol>;

export function specificationFromObject(specObject: Object): Specification {
    let res = Immutable.Map<string, Immutable.Set<string | number> | symbol>();
    _.each(specObject, (values: Array<number | string> | symbol, key: string) => {
        if (values === fullTextField) {
            res = res.set(key, fullTextField);
        }
        else if (values instanceof Array) {
            res = res.set(key, Immutable.Set(values));
        }
    });

    return res;
}

export const topLevel = Symbol();

export interface PartState {
    id: number;
    type: Part;
    name: symbol | string;
    parent: symbol | string;
    config: Immutable.Map<string, string | number>;
}

export let partRegister = Immutable.Map<string, Part>();
export function registerPart(name: string, part: Part): void {
    partRegister = partRegister.set(name, part);
}

let nextId: number = 1;
export function toPartState(partDescription: PartDescription): PartState {
    // initialize type
    let typeString = partDescription.type;
    let typePart = partRegister.get(typeString);
    if (typePart === undefined) {
        throw new Error('The type ' + partDescription.type + ' is unrecognized.');
    }
    let parent = (partDescription.parent === undefined) ? topLevel : partDescription.parent;
    let res: PartState = {
        id: nextId,
        name: partDescription.name,
        type: typePart,
        parent: parent,
        config: typePart.defaultConfig,
    };
    // load remaining fields into config list
    let configDescription = Immutable.Map<string, string | number>(_.omit(partDescription, ['name', 'parent', 'type']));
    configDescription.forEach((value: string | number, key: string) => {
        if (!typePart.specification.has(key)) {
            throw new Error('The property ' + key + ' is not valid for type ' + typeString + '.');
        }
        const field = typePart.specification.get(key);
        value = defensiveParseInt(value);
        if (field === fullTextField || (isSet(field) && field.contains(value))) {
            res.config = res.config.set(key, value);
        }
        else {
            throw new Error('The property ' + key + ' can not have the value ' + value + ' in type '
                + typeString + '.');
        }
    });

    nextId++;
    return res;
}