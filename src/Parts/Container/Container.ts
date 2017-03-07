import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerLogic from './ContainerLogic';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';

const Container: Part = {
    Logic: () => new ContainerLogic(),
    Component: ContainerComponent,
    specification: specificationFromObject({}),
    defaultConfig: Immutable.Map<string, string>(),
    canHaveChildren: true
};
export default Container;

registerPart('container', Container);