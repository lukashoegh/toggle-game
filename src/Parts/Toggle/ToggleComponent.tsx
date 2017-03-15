import * as React from 'react';
import './../Part.css';
import './Toggle.css';
import { DefaultProps } from '../../Part';
import { getPartSizing, getLabel } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    state: string;
    label: string;
    color: string;
}

export default class ToggleComponent extends React.Component<P, null> {

    constructor(props: P) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const partStyle = getPartSizing(scale, 350);
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        const labelElement = getLabel(this.props.label, scale, 400);
        let classes = 'Toggle-' + this.props.color + ' Toggle part';
        if (this.props.state === 'on') {
            classes += ' Toggle-on';
        }
        return (
            <div className={classes} style={partStyle}>
                <div 
                    className="Toggle-wrapper part-inside-wrapper" 
                    style={innerStyle}
                    onClick={this.handleClick}
                >
                    <span className="Toggle-background" />
                    <span className="Toggle-button" />
                </div>
                {labelElement}
            </div>
        );
    }

    private handleClick(): void {
        this.props.receivePayload();
    }
}