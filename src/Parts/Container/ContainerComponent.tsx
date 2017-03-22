import * as React from 'react';
import './Container.css';
import { generateClasses } from '../PartUtils';

interface P {
  direction: string;
  background: string;
}
export default class ContainerComponent extends React.Component<P, null> {
  public render() {
    const classes = generateClasses('Container', [this.props.direction, this.props.background]);
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}