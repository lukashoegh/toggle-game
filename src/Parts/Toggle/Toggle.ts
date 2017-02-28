import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import ToggleComponent from './ToggleComponent';
import ToggleLogic from './ToggleLogic';
import * as Immutable from 'immutable';
import * as _ from 'lodash';

export const Toggle: Part = {
    Logic: () => new ToggleLogic(),
    Component: ToggleComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField
    }),
    defaultConfig: Immutable.Map<string, string>([
        ['state', 'off'],
        ['size', '4'],
        ['label', '']
    ]),
    canHaveChildren: false
};

registerPart('toggle', Toggle);