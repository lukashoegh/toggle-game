import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'container',
            background: 'dark',
            name: 'p',
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row1',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row1',
            state: 'on',
        },
        {
            type: 'indicator',
            parent: 'row1',
            state: 'on',
        },
        {
            type: 'indicator',
            parent: 'row1',
            state: 'on',
        },
        {
            type: 'indicator',
            parent: 'row1',
            state: 'on',
        },
        {
            type: 'indicator',
            parent: 'row1',
            state: 'on',
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row2',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row2'
        },
        {
            type: 'indicator',
            parent: 'row2'
        },
        {
            type: 'indicator',
            parent: 'row2'
        },
        {
            type: 'indicator',
            parent: 'row2'
        },
        {
            type: 'indicator',
            parent: 'row2',
            state: 'on',
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row3',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row3'
        },
        {
            type: 'indicator',
            parent: 'row3'
        },
        {
            type: 'indicator',
            parent: 'row3'
        },
        {
            type: 'indicator',
            parent: 'row3'
        },
        {
            type: 'indicator',
            parent: 'row3'
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row4',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row4'
        },
        {
            type: 'indicator',
            parent: 'row4'
        },
        {
            type: 'indicator',
            parent: 'row4'
        },
        {
            type: 'indicator',
            parent: 'row4'
        },
        {
            type: 'indicator',
            parent: 'row4'
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row5',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row5'
        },
        {
            type: 'indicator',
            parent: 'row5'
        },
        {
            type: 'indicator',
            parent: 'row5'
        },
        {
            type: 'indicator',
            parent: 'row5'
        },
        {
            type: 'indicator',
            parent: 'row5'
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row6',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row6'
        },
        {
            type: 'indicator',
            parent: 'row6'
        },
        {
            type: 'indicator',
            parent: 'row6'
        },
        {
            type: 'indicator',
            parent: 'row6'
        },
        {
            type: 'indicator',
            parent: 'row6'
        },
        {
            type: 'container',
            direction: 'row',
            name: 'row7',
            parent: 'p',
        },
        {
            type: 'indicator',
            parent: 'row7'
        },
        {
            type: 'indicator',
            parent: 'row7'
        },
        {
            type: 'indicator',
            parent: 'row7'
        },
        {
            type: 'indicator',
            parent: 'row7'
        },
        {
            type: 'indicator',
            parent: 'row7'
        },
    ];
}

export default TestLevel;