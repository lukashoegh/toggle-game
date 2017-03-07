import * as React from 'react';
import Logic from './Logic';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import Action from './Action';

export interface PartDescription {
    type: string;
    name?: string;
    parent?: string;
    [other: string]: undefined | string | number;
}

// special fields
export const fullTextField = Symbol();

export interface DefaultProps {
    id: number;
    receiveAction: (action: Action) => void;
}

export interface Part {
    readonly Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
    ) => Logic;
    readonly Component: typeof React.Component;
    readonly specification: Specification;
    readonly defaultConfig: Immutable.Map<string, string>;
    readonly canHaveChildren: boolean;
}

function isStringSet(s: Immutable.Set<string> | symbol): s is Immutable.Set<string> {
    return ((<Immutable.Set<string>> s).contains !== undefined);
}

export type Specification = Immutable.Map<string, Immutable.Set<string> | symbol>;

export function specificationFromObject(specObject: Object): Specification {
    let res = Immutable.Map<string, Immutable.Set<string> | symbol>();
    _.each(specObject, (values: Array<number | string> | symbol, key: string) => {
        if (values === fullTextField) {
            res = res.set(key, fullTextField);
        }
        else if (values instanceof Array) {
            let valuesAsStrings = _.map(values, (s) => '' + s);
            res = res.set(key, Immutable.Set(valuesAsStrings));
        }
    });

    return res;
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

let nextId: number = 1;
export function toPartState(partDescription: PartDescription): PartState {
    // initialize type
    let typeString = partDescription.type;
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

    // set up name and parent, and remove those properties, so we can use the remaining as config
    res.name = partDescription.name;
    res.parent = (partDescription.parent !== undefined) ? partDescription.parent : topLevel;

    // load remaining fields into config list
    res.config = typePart.defaultConfig;
    let configDescription = Immutable.Map<string, string | number>(_.omit(partDescription, ['name', 'parent', 'type']));
    configDescription.forEach((value: string | number, key: string) => {
        value = '' + value;
        if (!typePart.specification.has(key)) {
            throw new Error('The property ' + key + ' is not valid for type ' + typeString + '.');
        }
        const field = typePart.specification.get(key);
        if (field === fullTextField || (isStringSet(field) && field.contains(value))) {
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