import * as React from 'react';
import './../Part.css';
import './Spinner.css';
import { DefaultProps } from '../../Part';
import { getPartSizing } from '../PartUtils';

interface P extends DefaultProps {
    size: string;
    rotation: number;
}

export default class SpinnerComponent extends React.Component<P, {hoverUp: boolean, hoverDown: boolean}> {
    constructor(props: P) {
        super(props);
        this.state = {hoverUp: false, hoverDown: false};
        this.handleUpClick = this.handleUpClick.bind(this);
        this.handleUpMouseOver = this.handleUpMouseOver.bind(this);
        this.handleUpMouseOut = this.handleUpMouseOut.bind(this);
        this.handleDownClick = this.handleDownClick.bind(this);
        this.handleDownMouseOver = this.handleDownMouseOver.bind(this);
        this.handleDownMouseOut = this.handleDownMouseOut.bind(this);
    }
    render() {
        const scale = Number(this.props.size) / 20;
        const partStyle = getPartSizing(scale);
        let partClassName = 'Spinner part';
        partClassName += (this.state.hoverUp) ? ' Spinner-hover-up' : '';
        partClassName += (this.state.hoverDown) ? ' Spinner-hover-down' : '';
        const innerStyle = {
            transform: 'scale(' + scale + ')',
        };
        const rotateStyle = {
            transform: 'rotate(' + this.rotationAsDegrees() + 'deg)',
        };
        
        return (
            <div className={partClassName} style={partStyle}>
                <div className="Spinner-wrapper part-inside-wrapper" style={innerStyle} >
                    <span className="Spinner-spokes" style={rotateStyle} />
                    <span className="Spinner-border" />
                    <span className="Spinner-pointer" style={rotateStyle} />
                    <span className="Spinner-top" />
                    <span className="Spinner-indicators" style={rotateStyle} >
                        <span className="Spinner-up" />
                        <span className="Spinner-down" />
                    </span>
                    <span
                        className="Spinner-click-up" 
                        style={rotateStyle}
                        onClick={this.handleUpClick}
                        onMouseOver={this.handleUpMouseOver}
                        onMouseOut={this.handleUpMouseOut}
                    />
                    <span
                        className="Spinner-click-down"
                        style={rotateStyle}
                        onClick={this.handleDownClick}
                        onMouseOver={this.handleDownMouseOver}
                        onMouseOut={this.handleDownMouseOut}
                    />
                </div>
            </div>
        );
    }

    private rotationAsDegrees() {
        return (this.props.rotation - 2) * 30;
    }

    private handleUpClick(): void {
        this.props.receivePayload('up');
    }
    private handleUpMouseOver(): void {
        this.setState({hoverUp: true});
    }
    private handleUpMouseOut(): void {
        this.setState({hoverUp: false});
    }
    private handleDownClick(): void {
        this.props.receivePayload('down');
    }
    private handleDownMouseOver(): void {
        this.setState({hoverDown: true});
    }
    private handleDownMouseOut(): void {
        this.setState({hoverDown: false});
    }
}