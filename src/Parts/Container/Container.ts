import { Part, registerPart } from '../../Part';
import ToggleComponent from '../Toggle/ToggleComponent';
import ContainerLogic from './ContainerLogic';

export let Container: Part = {
    Logic: ContainerLogic,
    Component: ToggleComponent
}

registerPart('container', Container);