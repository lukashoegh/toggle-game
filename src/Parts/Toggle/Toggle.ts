import { Part, registerPart } from '../../Part';
import ToggleComponent from './ToggleComponent';
import ToggleLogic from './ToggleLogic';
import * as Immutable from 'immutable';

export const Toggle: Part = {
    Logic: ToggleLogic,
    Component: ToggleComponent,
    defaultConfig: Immutable.Map<string, string>([
        ['initialstate', 'off'],
        ['size', 'small']
    ])
};

registerPart('toggle', Toggle);

export const ConfigSpec = {
    size: ['very-small', 'small', 'medium', 'large', 'very-large'],
};

export const DefaultConfig = {
    size: 'small',
};