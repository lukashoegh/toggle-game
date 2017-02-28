import * as React from 'react';
import './Container.css';

export default class ContainerComponent extends React.Component<null, null> {
    public render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}