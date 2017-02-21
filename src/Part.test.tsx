import { PartState, toPartState, PartDescription, topLevel } from './Part';
import { Toggle } from './Parts/Toggle/Toggle';
import * as _ from 'lodash';
import * as Immutable from 'immutable';

describe('Conversion of PartDescription to PartState', () => {

    it('Name is lowercased and copied to the part state', () => {
        let partState: PartState = toPartState({type: 'Toggle', name: 'TestName123', parent: 'aParent'});
        expect(partState.name).toEqual('testname123');
    });

    it('Not providing a name does not cause an error', () => {
        toPartState({type: 'Toggle'});
    })

    it('Parent is lowercased and copied to the part state', () => {
        let partState: PartState = toPartState({type: 'Toggle', name: 'TestName123', parent: 'aParent'});
        expect(partState.parent).toEqual('aparent');
    });
    it('If no parent is provided, it is instead set to the topLevel symbol', () => {
        let partState: PartState = toPartState({type: 'Toggle', name: 'TestName123'});
        expect(partState.parent).toBe(topLevel);
    });

    it('A valid type is transformed to the correct Part', () => {
        let partState: PartState = toPartState({type: 'Toggle', name: 'TestName123', parent: 'aParent'});
        expect(partState.type).toBe(Toggle);
    });

    it('Providing an invalid type creates an exception', () => {
        let partDescription: PartDescription = {type: 'Bagle', name: 'TestName123', parent: 'aParent'};
        expect(() => toPartState(partDescription)).toThrow;  
    });

    it('Each partstate has a new id', () => {
        let partState1: PartState = toPartState({type: 'Toggle', name: 'a', parent: 'aParent'});
        let partState2: PartState = toPartState({type: 'Toggle', name: 'b', parent: 'asd'});
        let partState3: PartState = toPartState({type: 'Toggle', name: 'c', parent: 'dd'});
        expect(_.uniq([partState1.id, partState2.id, partState3.id]).length).toBe(3);
    });

    it('If no extra fields are provided, the resulting config field matches the default config of the part', () => {
        let partState: PartState = toPartState({type: 'Toggle'});
        expect(partState.config).toEqual(Toggle.defaultConfig);
    });

    it('Valid fields are copied to the config', () => {
        let partState: PartState = toPartState({type: 'Toggle', initialState: 'on', size: 'medium'});
        expect(Immutable.Map([['initialstate', 'on'], ['size', 'medium']]).isSubset(partState.config)).toBeTruthy;
    });

});
