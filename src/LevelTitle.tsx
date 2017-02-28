import * as React from 'react';

interface P {
    title: string;
    author: string;
}

class LevelTitle extends React.Component<P, null> {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>by {this.props.author}</div>
            </div>
        );
    }
}

export default LevelTitle;