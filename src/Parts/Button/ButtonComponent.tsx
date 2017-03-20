import * as React from 'react';
import './../Part.css';
import './Button.css';
import { DefaultProps } from '../../Part';
import { getLabel, getPartSizing } from '../PartUtils';

interface P extends DefaultProps {
  size: string;
  label: string;
  color: string;
}

export default class ButtonComponent extends React.Component<P, null> {
  constructor(props: P) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const scale = Number(this.props.size) / 20;
    const partStyle = getPartSizing(scale);
    const innerStyle = {
      transform: 'scale(' + scale + ')',
    };
    const labelElement = getLabel(this.props.label, scale);
    const classes = 'Button-' + this.props.color + ' Button part';
    return (
      <div className={classes} style={partStyle}>
        <div
          className="Button-wrapper part-inside-wrapper"
          style={innerStyle}
          onClick={this.handleClick}
        >
          <span className="Button-border" />
          <span className="Button-background" />
        </div>
        {labelElement}
      </div>
    );
  }
  
  private handleClick(): void {
    this.props.receivePayload();
  }
}