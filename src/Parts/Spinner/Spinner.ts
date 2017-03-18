import { Part, registerPart, specificationFromObject } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import Action from '../../Action';
import SpinnerLogic from './SpinnerLogic';
import SpinnerComponent from './SpinnerComponent';

const Spinner: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new SpinnerLogic(getConfig, setConfig, receiveAction),
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