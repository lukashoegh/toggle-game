import * as ReactTestRender from 'react-test-renderer';
import LevelTitle from './LevelTitle';
import * as React from 'react';

it('renders correctly', () => {
    const tree = ReactTestRender.create(
        <LevelTitle title="Test Title" author="Firstname McSecondname" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});