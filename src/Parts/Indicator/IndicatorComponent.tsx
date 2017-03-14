import * as React from 'react';
import './../Part.css';
import './Indicator.css';
import Action from '../../Action';
import { DefaultProps } from '../../Part';
import { USER_INPUT, emptyPayload } from '../../Action';
import { getLabel, getPartSizing } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    state: string;
    label: string;
}

export default class IndicatorComponent extends React.Component<P, null> {
    constructor(props: P) {
        super(props);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const partStyle = getPartSizing(scale);
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        const labelElement = getLabel(this.props.label, scale);
        let classes = 'Indicator part';
        if (this.props.state === 'on') {
            classes += ' Indicator-on';
        }
        return (
            <div className={classes} style={partStyle}>
                <div className="Indicator-wrapper part-inside-wrapper" style={innerStyle}>
                    <span className="Indicator-background" />
                    <span className="Indicator-off-shadow" />
                    <span className="Indicator-light" />
                    <span className="Indicator-reflection" />
                </div>
                {labelElement}
            </div>
        );
    }
}