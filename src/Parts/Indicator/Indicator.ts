import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { Connection } from '../../Connection';
import IndicatorLogic from './IndicatorLogic';
import IndicatorComponent from './IndicatorComponent';

const Indicator: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        triggerConnection: (connection: Connection, payload: string) => void
    ) => new IndicatorLogic(getConfig, setConfig, triggerConnection),
    Component: IndicatorComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField
    }),
    defaultConfig: Immutable.Map<string, string>({
        state: 'off',
        size: 4,
        label: '',
    }),
    canHaveChildren: false
};
export default Indicator;

registerPart('indicator', Indicator);