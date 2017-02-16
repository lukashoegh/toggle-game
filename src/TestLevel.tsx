import Level from './Level';
import * as React from 'react';
import LevelTitle from './LevelTitle';

class TestLevel extends React.Component<null, null> implements Level {
    render() {
        return (
            <LevelTitle title="Test Level" author="Lukas Høgh" />
        )
    }
}

export default TestLevel;