import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import ButtonComponent from './ButtonComponent';
import ButtonLogic from './ButtonLogic';
import Action from '../../Action';

const Button: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new ButtonLogic(getConfig, setConfig, receiveAction),
    Component: ButtonComponent,
    specification: specificationFromObject({
        size: _.range(1, 21),
        label: fullTextField,
        color: ['red', 'yellow', 'green', 'blue'],
    }),
    defaultConfig: Immutable.Map<string, string>({
        size: 4,
        label: '',
        color: 'red',
    }),
    canHaveChildren: false
};
export default Button;

registerPart('button', Button);