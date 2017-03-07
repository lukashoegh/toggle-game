import * as React from 'react';
import './Toggle.css';
import Action from '../../Action';
import { DefaultProps } from '../../Part';
import { USER_INPUT } from '../../Action';

interface P extends DefaultProps {
    size: string;
    state: string;
    label: string;
    receiveAction: (action: Action) => void;
}

export default class ToggleComponent extends React.Component<P, null> {
    constructor(props: P) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const hasLabel = (this.props.label !== '');
        const adjustedMargin = (5 + scale * 5) + 'px ';
        const toggleStyle = {
            margin: adjustedMargin + adjustedMargin + adjustedMargin + '0',
            height: (scale * 130) + 'px',
        };
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        const labelStyle = {
            'fontSize': scale * 100 + 'px',
            'lineHeight': scale * 120 + 'px',
            padding: '0 ' + 20 * scale + 'px 0 ' + 300 * scale + 'px'
        };
        const label = hasLabel ?
            <span className="Toggle-label" style={labelStyle}>
                {this.props.label}
            </span> : '';
        let classes = 'Toggle';
        if (this.props.state === 'on') {
            classes += ' Toggle-on';
        }
        return (
            <div className={classes} style={toggleStyle}>
                <div className="Toggle-wrapper" style={innerStyle} onClick={this.handleClick}>
                    <span className="Toggle-background">
                        <span className="Toggle-button" />
                    </span>
                </div>
                {label}
            </div>
        );
    }

    private handleClick<T>(e: T): void {
        let action: Action = { type: USER_INPUT };
        this.props.receiveAction(action);
    }
}