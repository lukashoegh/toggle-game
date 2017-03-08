import Action from './Action';

interface Logic {
    input: (action: Action) => void;
}
export default Logic;