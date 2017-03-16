import Level from './Level';

class TestLevel implements Level {
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
            type: 'indicator',
            size: 10,
            name: 'i'
        },
        {
            type: 'button',
            size: 10
        },
        {
            type: 'toggle',
            size: 10,
        },
        {
            type: 'spinner'
        }
    ];
}

export default TestLevel;