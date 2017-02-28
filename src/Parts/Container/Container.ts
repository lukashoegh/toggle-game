import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerLogic from './ContainerLogic';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';

export const Container: Part = {
    Logic: ContainerLogic,
    Component: ContainerComponent,
    specification: specificationFromObject({}),
    defaultConfig: Immutable.Map<string, string>(),
    canHaveChildren: true
};

registerPart('container', Container);