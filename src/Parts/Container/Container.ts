import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Input, ToggleInput, ToggleTurnOnInput, ToggleTurnOffInput } from '../../Input';
import { Output } from '../../Output';

const Container: Part = {
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
  defaultOutput: 'toggle',
};
export default Container;

registerPart('container', Container);