import {
  PartState, toPartState, PartDescription, topLevel,
  specificationFromObject, registerPart, partRegister
} from './Part';
import Toggle from './Parts/Toggle/Toggle';
import * as _ from 'lodash';
import * as Immutable from 'immutable';

describe('Conversion of PartDescription to PartState', () => {

  it('Name is copied to the part state', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'testname123', parent: 'aparent' });
    expect(partState.name).toEqual('testname123');
  });
  it('Parent is copied to the part state', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'testname123', parent: 'aparent' });
    expect(partState.parent).toEqual('aparent');
  });
  it('If no parent is provided, it is instead set to the topLevel symbol', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'testname123' });
    expect(partState.parent).toBe(topLevel);
  });
  it('A valid type is transformed to the correct Part', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'testname123', parent: 'aparent' });
    expect(partState.type).toBe(Toggle);
  });
  it('Providing an invalid type creates an exception', () => {
    let partDescription: PartDescription = { type: 'bagle', name: 'testname123', parent: 'aparent' };
    expect(() => toPartState(partDescription)).toThrow;
  });
  it('Each partstate has a new id', () => {
    let partState1: PartState = toPartState({ type: 'toggle', name: 'testname123', parent: 'aparent' });
    let partState2: PartState = toPartState({ type: 'toggle', name: 'b', parent: 'asd' });
    let partState3: PartState = toPartState({ type: 'toggle', name: 'c', parent: 'dd' });
    expect(_.uniq([partState1.id, partState2.id, partState3.id]).length).toBe(3);
  });
  it('If no extra fields are provided, the resulting config field matches the default config of the part', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'test' });
    expect(partState.config).toEqual(Toggle.defaultConfig);
  });
  it('Valid fields are copied to the config', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'test', state: 'on', size: 8 });
    expect(partState.config.get('state')).toEqual('on');
    expect(partState.config.get('size')).toEqual(8);
  });
  it('Invalid fields result in an exception', () => {
    let partDescription: PartDescription = { type: 'toggle', name: 'test', peculiarclowns: 'of course', size: 4 };
    expect(() => toPartState(partDescription)).toThrow;
  });
  it('Invalid values result in an exception', () => {
    let partDescription: PartDescription = { type: 'toggle', name: 'test', size: 'medium' };
    expect(() => toPartState(partDescription)).toThrow;
  });
  it('If a text field is permitted, it is coppied as expected', () => {
    let partState: PartState = toPartState({ type: 'toggle', name: 'test', label: 'test string' });
    expect(partState.config.get('label')).toEqual('test string');
  });
});

describe('Create specification from object', () => {
  it('Correctly converts sample data', () => {
    let sample = {
      initialstate: ['on', 'off'],
      size: ['small', 'large']
    };
    let spec = specificationFromObject(sample);
    let e = Immutable.Map<string, Immutable.Set<string>>();
    e = e.set('initialstate', Immutable.Set<string>().add('on').add('off'));
    e = e.set('size', Immutable.Set<string>().add('small').add('large'));
    expect(spec).toEqual(e);
  });
});

describe('Part register', () => {
  it('Registering a part makes it available', () => {
    registerPart('test', Toggle);
    expect(partRegister.get('test')).toEqual(Toggle);
  });
});