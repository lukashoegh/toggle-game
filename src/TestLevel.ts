import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public parts = [
        {
            type: 'container',
            name: '1'
        },
        {
            type: 'container',
            name: '2',
            parent: '1'
        },
        {
            type: 'container',
            name: '3',
            parent: '2'
        },
        {
            type: 'container',
            name: '4',
            parent: '3'
        },
        {
            type: 'toggle',
            parent: '4',
            size: 4
        },
        {
            type: 'toggle',
            parent: '4',
            size: 8
        },
        {
            type: 'toggle',
            parent: '4',
            size: 4
        },
        {
            type: 'toggle',
            parent: '4',
            size: 4
        },

    ];
}

export default TestLevel;