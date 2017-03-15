import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import ToggleComponent from './ToggleComponent';
import ToggleLogic from './ToggleLogic';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import Action from '../../Action';

const Toggle: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new ToggleLogic(getConfig, setConfig, receiveAction),
    Component: ToggleComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField,
        color: ['red', 'yellow', 'green', 'blue'],
    }),
    defaultConfig: Immutable.Map<string, string>({
        state: 'off',
        size: 4,
        label: '',
        color: 'green',
    }),
    canHaveChildren: false
};
export default Toggle;

registerPart('toggle', Toggle);