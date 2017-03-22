import * as React from 'react';

export function getLabel(label: string, scale: number, leftPadding: number = 250): JSX.Element | string {
  const labelStyle = {
    fontSize: scale * 150 + 'px',
    lineHeight: scale * 180 + 'px',
    height: scale * 180 + 'px',
    padding: '0 ' + 120 * scale + 'px 0 ' + leftPadding * scale + 'px',
    maxWidth: 1200 * scale + 'px'
  };
  return (label !== '') ? (
    <span className="label" style={labelStyle}>
      {label}
    </span>
  ) : '';
}

export function getPartSizing(scale: number, width: number = 200, height: number = 200) {
  return {
    height: (scale * height) + 'px',
    minWidth: (scale * width) + 'px'
  };
}

export function generateClasses(partName: string, props: string[]): string {
  let res = partName;
  for (let prop of props) {
    res += ' ' + partName + '-' + prop;
  }
  return res;
}