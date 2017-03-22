import * as React from 'react';
import '../Part.css';
import './Spinner.css';
import './SpinnerDecalsAnimation.css';
import { DefaultProps } from '../../Part';
import * as _ from 'lodash';

interface P extends DefaultProps {
  position: number;
  label0: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
  label6: string;
  label7: string;
  label8: string;
  label9: string;
  label10: string;
  label11: string;
  disable0: string;
  disable1: string;
  disable2: string;
  disable3: string;
  disable4: string;
  disable5: string;
  disable6: string;
  disable7: string;
  disable8: string;
  disable9: string;
  disable10: string;
  disable11: string;
}

export default class SpinnerComponent extends React.Component<P, { hoverUp: boolean, hoverDown: boolean }> {

  private spokesStyle: any;
  private spinnerDecals: JSX.Element[];

  constructor(props: P) {
    super(props);

    this.spokesStyle = { backgroundImage: '' };
    for (let i = 0; i < 360; i += 5) {
      this.spokesStyle.backgroundImage += 'linear-gradient(' + i + 'deg, rgba(255,255,255,0) 0%,' + 
      ' rgba(255,255,255,0) 49%, rgba(0,0,0,1) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 100% )';
      if (i < 355) {
        this.spokesStyle.backgroundImage += ', ';
      }
    }

    this.spinnerDecals = [];
    for (let i = 1; i < 12; i++) {
      this.spinnerDecals.push(<span className={'Spinner-decal-' + i} key={i} />);
    }

    this.state = { hoverUp: false, hoverDown: false };
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleUpMouseOver = this.handleUpMouseOver.bind(this);
    this.handleUpMouseOut = this.handleUpMouseOut.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleDownMouseOver = this.handleDownMouseOver.bind(this);
    this.handleDownMouseOut = this.handleDownMouseOut.bind(this);
  }
  render() {
    let spinnerLabels = Array<JSX.Element>();
    for (let i = 0; i < 12; i++) {
      let className = 'Spinner-label-' + i;
      if (i === this.props.position) {
        className += ' Spinner-label-active';
      }
      if (this.props['disable' + i] === 'no') {
        if (this.props['label' + i] === '') {
          className += ' Spinner-label-empty';
          spinnerLabels.push(<span className={className} key={i} />);
        }
        else {
          spinnerLabels.push((
            <div className={className} key={i}>
              <span>{this.props['label' + i].substr(0, 6)}</span>
            </div>
          ));
        }
      }
    }
    let partClassName = 'Spinner part';
    partClassName += (this.state.hoverUp) ? ' Spinner-hover-up' : '';
    partClassName += (this.state.hoverDown) ? ' Spinner-hover-down' : '';
    const rotateStyle = {
      transform: 'rotate(' + this.positionAsDegrees() + 'deg)',
    };
    let currentSpokesStyle = _.assign({}, this.spokesStyle, rotateStyle);

    return (
      <div className={partClassName}>
        <div className="Spinner-labels">
          {spinnerLabels}
        </div>
        <div className="Spinner-wrapper part-inside-wrapper" >
          <span className="Spinner-spokes" style={currentSpokesStyle} />
          <span className="Spinner-border" />
          <span className="Spinner-top" />
          <span className="Spinner-decals" style={rotateStyle}>
            {this.spinnerDecals}
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

  private positionAsDegrees() {
    return (this.props.position) * 30;
  }

  private handleUpClick(): void {
    this.props.receivePayload('decrease');
    this.setState({ hoverUp: false });
  }
  private handleUpMouseOver(): void {
    this.setState({ hoverUp: true });
  }
  private handleUpMouseOut(): void {
    this.setState({ hoverUp: false });
  }
  private handleDownClick(): void {
    this.props.receivePayload('increase');
    this.setState({ hoverDown: false });
  }
  private handleDownMouseOver(): void {
    this.setState({ hoverDown: true });
  }
  private handleDownMouseOut(): void {
    this.setState({ hoverDown: false });
  }
}