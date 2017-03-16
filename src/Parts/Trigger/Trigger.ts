import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import TriggerLogic from './TriggerLogic';
import TriggerComponent from './TriggerComponent';
import Action from '../../Action';

const Trigger: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new TriggerLogic(getConfig, setConfig, receiveAction),
    Component: TriggerComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField,
    }),
    defaultConfig: Immutable.Map<string, string>({
        state: 'off',
        size: 20,
        label: '',
    }),
    canHaveChildren: false
};
export default Trigger;

registerPart('trigger', Trigger);