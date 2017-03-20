import { LevelContextualDescription } from './Level';

class TestLevel implements LevelContextualDescription {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'trigger',
            size: 10,
            name: 't'
        },
        {
            input: 'turnOn'
        },
        {
            type: 'indicator',
            size: 10,
            name: 'i'
        },
        {
            type: 'button',
            size: 10
        },
        {
            to: 'i',
            input: 'turnOff'
        },
        {
            type: 'toggle',
            size: 10,
        },
        {
            to: 'i',
            input: 'toggle'
        },
        {
            to: 't',
            input: 'release'
        },
        {
            type: 'spinner'
        }
    ];
}

export default TestLevel;