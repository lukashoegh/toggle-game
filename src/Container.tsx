import * as React from 'react';

class Container extends React.Component<null, null> {
    public render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Container;