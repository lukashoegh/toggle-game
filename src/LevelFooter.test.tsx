import * as ReactTestRender from 'react-test-renderer';
import * as React from 'react';
import LevelFooter from './LevelFooter';

it('renders correctly', () => {
    const tree = ReactTestRender.create(
        <LevelFooter />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});