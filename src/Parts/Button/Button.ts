import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { Connection } from '../../Connection';
import ButtonComponent from './ButtonComponent';
import ButtonLogic from './ButtonLogic';

const Button: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        triggerConnection: (connection: Connection, payload: string) => void
    ) => new ButtonLogic(getConfig, setConfig, triggerConnection),
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