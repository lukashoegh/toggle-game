import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import ToggleComponent from './ToggleComponent';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, ToggleInput, ToggleTurnOnInput, ToggleTurnOffInput, ToggleFromPayloadInput } from '../../Input';
import { Output, UnconditionalOutput } from '../../Output';

const Toggle: Part = {
  Logic: (callbacks: LogicCallbacks) => new GenericLogic(
    callbacks,
    Immutable.Map<string, Input>({
      toggle: new ToggleInput(),
      turnOn: new ToggleTurnOnInput(),
      turnOff: new ToggleTurnOffInput(),
      fromPayload: new ToggleFromPayloadInput(),
    }),
    Immutable.Map<string, Output>({
      toggle: new UnconditionalOutput(),
      turnOn: new ToggleTurnOnInput(),
      turnOff: new ToggleTurnOffInput(),
    }),
    'toggle',
  ),
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
  canHaveChildren: false,
  defaultInput: 'toggle',
  defaultOutput: 'toggle',
};
export default Toggle;

registerPart('toggle', Toggle);