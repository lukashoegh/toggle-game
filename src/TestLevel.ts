import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'button',
            label: 'Buttoned!',
            size: 7
        },
        {
            type: 'indicator',
            label: 'Indicated!',
            name: 'i',
            size: 7
        },
        {
            type: 'trigger',
            label: 'Triggered!',
            name: 't',
            size: 7
        },
        {   from: 't',
            output: 'toggle',
            to: 'i',
            input: 'toggle'
        },
        {
            type: 'toggle',
            label: 'Toggled!',
            size: 7
        },
    ];
}

export default TestLevel;