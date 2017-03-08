import Action from './Action';

// constructor interface is in Part.ts
interface Logic {
    input: (action: Action) => void;
}
export default Logic;