import * as React from 'react';
import './../Part.css';
import './Spinner.css';
import { DefaultProps } from '../../Part';
import { getPartSizing } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    state: string;
}

export default class SpinnerComponent extends React.Component<P, null> {
    constructor(props: P) {
        super(props);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const partStyle = getPartSizing(scale);
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        return (
            <div className="Spinner" style={partStyle}>
                <div className="Spinner-wrapper part-inside-wrapper" style={innerStyle}>
                    <span className="Spinner-background" />
                    <span className="Spinner-top" />
                </div>
            </div>
        );
    }
}