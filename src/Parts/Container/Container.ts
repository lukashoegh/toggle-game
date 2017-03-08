import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerLogic from './ContainerLogic';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';
import { Connection } from '../../Connection';

const Container: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        triggerConnection: (connection: Connection, payload: string) => void
    ) => new ContainerLogic(getConfig, setConfig, triggerConnection),
    Component: ContainerComponent,
    specification: specificationFromObject({}),
    defaultConfig: Immutable.Map<string, string>(),
    canHaveChildren: true
};
export default Container;

registerPart('container', Container);