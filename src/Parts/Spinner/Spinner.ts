import { Part, registerPart, specificationFromObject, fullTextField } from '../../Part';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import SpinnerComponent from './SpinnerComponent';
import { LogicCallbacks, GenericLogic } from '../../Logic';
import { Output, IncreaseOutput, DecreaseOutput, IncreaseDecreaseOutput } from '../../Output';
import { Input, FromPayloadInput, DecreaseInput, IncreaseInput } from '../../Input';

let range = _.range(0, 12);
let disableKeys: string[] = _.map<number, string>(range, (value: number) => ('disable' + value));
let disableSpec = _.fromPairs(_.map(disableKeys, (key: string) => [key, ['yes', 'no']]));
let disableDefaults = _.fromPairs(_.map(disableKeys, (key: string) => [key, 'no']));
let labelKeys: string[] = _.map<number, string>(range, (value: number) => ('label' + value));
let labelSpec = _.fromPairs(_.map(labelKeys, (key: string) => [key, fullTextField]));
let labelDefaults = _.fromPairs(_.map(labelKeys, (key: string) => [key, '']));

const Spinner: Part = {
  Logic: (callbacks: LogicCallbacks) => {
    let increase = new IncreaseInput('position', -Infinity, Infinity, false);
    let decrease = new DecreaseInput('position', -Infinity, Infinity, false);
    return new GenericLogic(
      callbacks,
      Immutable.Map<string, Input>({
        increase: increase,
        decrease: decrease,
        fromPayload: new FromPayloadInput(increase, decrease),
      }),
      Immutable.Map<string, Output>({
        change: new IncreaseDecreaseOutput(-Infinity, Infinity, false),
        increase: new IncreaseOutput(-Infinity, Infinity, false),
        decrease: new DecreaseOutput(-Infinity, Infinity, false),
      }),
      'fromPayload',
    );
  },
  Component: SpinnerComponent,
  specification: specificationFromObject({
    position: _.range(0, 12),
    ...disableSpec,
    ...labelSpec,
  }),
  defaultConfig: Immutable.Map<string, string>({
    position: 0,
    ...disableDefaults,
    ...labelDefaults,
  }),
  canHaveChildren: false,
  defaultInput: 'toggle',
  defaultOutput: 'toggle',
};
export default Spinner;

registerPart('spinner', Spinner);