import * as React from 'react';
import './Toggle.css';

interface P {
    size: string;
}
export default class ToggleComponent extends React.Component<P, null> {
    render() {
        return (
            <div className={'Toggle Toggle-' + this.props.size}>
                <span className="Toggle-background">
                    <span className="Toggle-button" />
                </span>
            </div>
        );
    }
}