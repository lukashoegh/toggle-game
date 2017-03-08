import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import ToggleComponent from './ToggleComponent';
import ToggleLogic from './ToggleLogic';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { Connection } from '../../Connection';

const Toggle: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        triggerConnection: (connection: Connection, payload: string) => void
    ) => new ToggleLogic(getConfig, setConfig, triggerConnection),
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
export default Toggle;

registerPart('toggle', Toggle);