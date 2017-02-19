import * as React from 'react';
import './Toggle.css';

interface P {
    size?: string;
}
export class Toggle extends React.Component<P, null> {
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

export const ConfigSpec = {
    size: ['very-small', 'small', 'medium', 'large', 'very-large'],
}

export const DefaultConfig = {
    size: 'small',
};