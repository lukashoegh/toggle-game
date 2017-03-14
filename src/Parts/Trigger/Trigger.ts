import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { Connection } from '../../Connection';
import TriggerLogic from './TriggerLogic';
import TriggerComponent from './TriggerComponent';

const Trigger: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        triggerConnection: (connection: Connection, payload: string) => void
    ) => new TriggerLogic(getConfig, setConfig, triggerConnection),
    Component: TriggerComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField,
    }),
    defaultConfig: Immutable.Map<string, string>({
        state: 'off',
        size: 4,
        label: '',
    }),
    canHaveChildren: false
};
export default Trigger;

registerPart('trigger', Trigger);