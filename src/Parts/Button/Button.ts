import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import ButtonComponent from './ButtonComponent';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, TrivialInput } from '../../Input';
import { Output, UnconditionalOutput } from '../../Output';

const Button: Part = {
  Logic: (callbacks: LogicCallbacks) => new GenericLogic(
    callbacks,
    Immutable.Map<string, Input>({
      press: new TrivialInput(),
    }),
    Immutable.Map<string, Output>({
      press: new UnconditionalOutput('press'),
    }),
    'press',
    true,
  ),
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
  canHaveChildren: false,
  defaultInput: '',
  defaultOutput: 'press',
};
export default Button;

registerPart('button', Button);