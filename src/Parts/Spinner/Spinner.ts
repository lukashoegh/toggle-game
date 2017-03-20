import { Part, registerPart, specificationFromObject } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import SpinnerLogic from './SpinnerLogic';
import SpinnerComponent from './SpinnerComponent';
import { LogicCallbacks } from '../../Logic';

const Spinner: Part = {
    Logic: (
        callbacks: LogicCallbacks
    ) => new SpinnerLogic(callbacks.getConfig, callbacks.setConfig, callbacks.receiveAction),
    Component: SpinnerComponent,
    specification: specificationFromObject({
        rotation: _.range(0, 12),
        size: _.range(1, 21),
    }),
    defaultConfig: Immutable.Map<string, string>({
        rotation: 2,
        size: 20,
    }),
    canHaveChildren: false,
    defaultInput: 'toggle',
    defaultOutput: 'toggle',
};
export default Spinner;

registerPart('spinner', Spinner);