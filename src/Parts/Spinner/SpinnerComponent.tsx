import * as React from 'react';
import './../Part.css';
import './Spinner.css';
import { DefaultProps } from '../../Part';
import { getPartSizing } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    state: string;
}

export default class SpinnerComponent extends React.Component<P, { rot: number}> {
    constructor(props: P) {
        super(props);
        this.state = {rot: 0 };
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const partStyle = getPartSizing(scale);
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        const rotateStyle = {
            transform: 'rotate(' + this.state.rot + 'deg)',
        };
        
        return (
            <div className="Spinner part" style={partStyle}>
                <div className="Spinner-wrapper part-inside-wrapper" style={innerStyle} onClick={this.handleClick}>
                    <span className="Spinner-spokes" style={rotateStyle} />
                    <span className="Spinner-border" />
                    <span className="Spinner-pointer" style={rotateStyle} />
                    <span className="Spinner-top" />
                </div>
            </div>
        );
    }

    private handleClick(): void {
        this.setState({rot: this.state.rot + 30});
    }
}