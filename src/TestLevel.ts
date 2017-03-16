import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public size = 15;
    public parts = [
        {
            type: 'spinner'
        }
    ];
}

export default TestLevel;