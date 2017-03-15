import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import IndicatorLogic from './IndicatorLogic';
import IndicatorComponent from './IndicatorComponent';
import Action from '../../Action';

const Indicator: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new IndicatorLogic(getConfig, setConfig, receiveAction),
    Component: IndicatorComponent,
    specification: specificationFromObject({
        state: ['on', 'off'],
        size: _.range(1, 21),
        label: fullTextField,
        color: ['red', 'yellow', 'green', 'blue'],
    }),
    defaultConfig: Immutable.Map<string, string>({
        state: 'off',
        size: 1,
        label: '',
        color: 'red'
    }),
    canHaveChildren: false
};
export default Indicator;

registerPart('indicator', Indicator);