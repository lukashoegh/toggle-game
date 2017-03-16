import * as React from 'react';
import './../Part.css';
import './Trigger.css';
import { DefaultProps } from '../../Part';
import { getPartSizing, getLabel } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    state: string;
    label: string;
}

export default class TriggerComponent extends React.Component<P, null> {

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
        let classes = 'Trigger part';
        if (this.props.state === 'on') {
            classes += ' Trigger-on';
        }
        return (
            <div className={classes} style={partStyle}>
                <div className="Trigger-wrapper part-inside-wrapper" style={innerStyle} onClick={this.handleClick}>
                    <span className="Trigger-bevel" />
                    <span className="Trigger-shadow" />
                    <span className="Trigger-clip">
                        <span className="Trigger-front" />
                        <span className="Trigger-top" />
                        <span className="Trigger-bottom" />
                    </span>
                </div>
                {labelElement}
            </div>
        );
    }

    private handleClick<T>(e: T): void {
        this.props.receivePayload();
    }
}