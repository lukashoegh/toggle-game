import Level from './Level';

class TestLevel implements Level {
    public title = 'Test Level';
    public author = 'Lukas Høgh';
    public parts = [
        {
            type: 'Visual.Toggle',
        }
    ];
}

export default TestLevel;