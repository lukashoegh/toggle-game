import { Part, registerPart, specificationFromObject } from '../../Part';
import ContainerLogic from './ContainerLogic';
import ContainerComponent from './ContainerComponent';
import * as Immutable from 'immutable';
import Action from '../../Action';

const Container: Part = {
    Logic: (
        getConfig: (key: string) => string,
        setConfig: (key: string, value: string) => void,
        receiveAction: (action: Action) => void
    ) => new ContainerLogic(getConfig, setConfig, receiveAction),
    Component: ContainerComponent,
    specification: specificationFromObject({
        direction: ['row', 'column'],
        background: ['light', 'dark', 'none'],
    }),
    defaultConfig: Immutable.Map<string, string>({
        direction: 'column',
        background: 'none',
    }),
    canHaveChildren: true
};
export default Container;

registerPart('container', Container);