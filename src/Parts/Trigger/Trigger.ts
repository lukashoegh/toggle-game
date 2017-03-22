import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import TriggerComponent from './TriggerComponent';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, TurnOnInput, TurnOffInput } from '../../Input';
import { Output, TurnOnOutput } from '../../Output';

const Trigger: Part = {
  Logic: (callbacks: LogicCallbacks) => new GenericLogic(
    callbacks,
    Immutable.Map<string, Input>({
      press: new TurnOnInput(),
      release: new TurnOffInput(),
    }),
    Immutable.Map<string, Output>({
      press: new TurnOnOutput(),
    }),
    'press',
    true,
  ),
  Component: TriggerComponent,
  specification: specificationFromObject({
    state: ['on', 'off'],
    size: _.range(2, 21),
    label: fullTextField,
  }),
  defaultConfig: Immutable.Map<string, string>({
    state: 'off',
    size: 4,
    label: '',
  }),
  canHaveChildren: false,
  defaultInput: 'release',
  defaultOutput: 'press',
};
export default Trigger;

registerPart('trigger', Trigger);