import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'toggle',
            name: 'one'
        },
        {
            type: 'toggle',
            name: 'two'
        },
        {
            type: 'toggle',
            name: 'three'
        },
        {
            type: 'toggle',
            name: 'four'
        },
        {
            from: 'one',
            output: 'toggle',
            to: 'two',
            input: 'toggle'
        },
        {
            from: 'one',
            output: 'toggle',
            to: 'four',
            input: 'toggle'
        },
        {
            from: 'one',
            output: 'toggle',
            to: 'two',
            input: 'toggle'
        },
        {
            from: 'two',
            output: 'toggle',
            to: 'four',
            input: 'toggle'
        },
        {
            from: 'four',
            output: 'toggle',
            to: 'one',
            input: 'toggle'
        },
    ];
}

export default TestLevel;