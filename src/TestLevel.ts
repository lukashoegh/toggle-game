import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'toggle',
            color: 'red',
            size: this.size
        },
        {
            type: 'button',
            color: 'red',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'off',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'on',
            size: this.size
        },
        {
            type: 'toggle',
            color: 'yellow',
            size: this.size
        },
        {
            type: 'button',
            color: 'yellow',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'off',
            color: 'yellow',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'on',
            color: 'yellow',
            size: this.size
        },
        {
            type: 'toggle',
            color: 'green',
            size: this.size
        },
        {
            type: 'button',
            color: 'green',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'off',
            color: 'green',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'on',
            color: 'green',
            size: this.size
        },
        {
            type: 'toggle',
            color: 'blue',
            size: this.size
        },
        {
            type: 'button',
            color: 'blue',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'off',
            color: 'blue',
            size: this.size
        },
        {
            type: 'indicator',
            state: 'on',
            color: 'blue',
            size: this.size
        },
    ];
}

export default TestLevel;