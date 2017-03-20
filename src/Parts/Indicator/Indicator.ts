import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import IndicatorComponent from './IndicatorComponent';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, ToggleInput, ToggleTurnOffInput, ToggleTurnOnInput } from '../../Input';
import { Output } from '../../Output';

const Indicator: Part = {
  Logic: (callbacks: LogicCallbacks) => new GenericLogic(
    callbacks,
    Immutable.Map<string, Input>({
      toggle: new ToggleInput(),
      turnOn: new ToggleTurnOnInput(),
      turnOff: new ToggleTurnOffInput(),
    }),
    Immutable.Map<string, Output>({
    }),
    '',
    false,
  ),
  Component: IndicatorComponent,
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
    color: 'red'
  }),
  canHaveChildren: false,
  defaultInput: 'toggle',
  defaultOutput: 'toggle',
};
export default Indicator;

registerPart('indicator', Indicator);