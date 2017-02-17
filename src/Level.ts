import Control from './Control';
import Logic from './Logic';
import Connection from './Connection';
import Container from './Container';

interface Level {
    title: string;
    author: string;
    parts: Array<Control | Container | Logic | Connection>;
}

export default Level;