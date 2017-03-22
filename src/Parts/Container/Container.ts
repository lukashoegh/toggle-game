import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, ToggleInput, TurnOnInput, TurnOffInput } from '../../Input';
import { Output } from '../../Output';

const Container: Part = {
  Logic: (callbacks: LogicCallbacks) => new GenericLogic(
    callbacks,
    Immutable.Map<string, Input>({
      toggle: new ToggleInput(),
      turnOn: new TurnOnInput(),
      turnOff: new TurnOffInput(),
    }),
    Immutable.Map<string, Output>({
    }),
    '',
    false,
  ),
  Component: ContainerComponent,
  specification: specificationFromObject({
    direction: ['row', 'column'],
    background: ['light', 'dark', 'none'],
  }),
  defaultConfig: Immutable.Map<string, string>({
    direction: 'column',
    background: 'none',
  }),
  canHaveChildren: true,
  defaultInput: 'toggle',
  defaultOutput: '',
};
export default Container;

registerPart('container', Container);