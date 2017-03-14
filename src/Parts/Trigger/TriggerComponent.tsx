import * as React from 'react';
import './../Part.css';
import './Trigger.css';
import Action from '../../Action';
import { DefaultProps } from '../../Part';
import { USER_INPUT, emptyPayload } from '../../Action';
import * as _ from 'lodash';
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
                    <span className="Trigger-border" />
                    <span className="Trigger-background" />
                    <span className="Trigger-button" />
                </div>
                {labelElement}
            </div>
        );
    }

    private handleClick<T>(e: T): void {
        let action: Action = { 
            type: USER_INPUT,
            payload: emptyPayload
        };
        this.props.receiveAction(action);
    }
}