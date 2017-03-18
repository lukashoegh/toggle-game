import { LevelContextualDescription } from './Level';

class EmptyLevel implements LevelContextualDescription {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public parts = [
    ];
}

export default EmptyLevel;