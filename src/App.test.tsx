import * as React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import Level from './Level';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import { Toggle } from './Parts/Toggle/Toggle';
import { Container } from './Parts/Container/Container';
import EmptyLevel from './EmptyLevel';

let level: Level;

describe('<App />', () => {

  beforeEach(() => {
    level = new EmptyLevel();
  });

  it('Renders without crashing', () => {
    mount(<App level={level} />);
  });
  it('Renders a title section', () => {
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(LevelTitle)).toHaveLength(1);
  });
  it('Renders a footer section', () => {
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(LevelFooter)).toHaveLength(1);
  });
  it('Renders a toggle', () => {
    level.parts.push({ type: 'toggle' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component)).toHaveLength(1);
  });
  it('Renders the correct number of toggles', () => {
    level.parts.push({ type: 'toggle' }, { type: 'toggle' }, { type: 'toggle' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component)).toHaveLength(3);
  });
  it('Renders all the parts inside a toplevel wrapper component', () => {
    level.parts.push({ type: 'toggle' }, { type: 'toggle' }, { type: 'toggle' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.children()).toHaveLength(3);
  });
  it('Renders a mix of toggles and containers', () => {
    level.parts.push({ type: 'toggle' }, { type: 'toggle' });
    level.parts.push({ type: 'container' }, { type: 'toggle' }, { type: 'container' });
    level.parts.push({ type: 'toggle' }, { type: 'toggle' });
    const wrapper = shallow(<App level={level} />);
    const top = wrapper.find(Container.Component).first();
    const t = Toggle.Component; const c = Container.Component;
    expect(top.children().map(node => node.type())).toEqual([
      t, t, c, t, c, t, t
    ]);
  });
  it('Only renders toplevel parts at top level', () => {
    level.parts.push({ type: 'container', name: 'parent' });
    level.parts.push({ type: 'toggle' }, { type: 'toggle' }, { type: 'toggle' });
    level.parts.push({ type: 'toggle', parent: 'parent' }, { type: 'toggle', parent: 'parent' });
    const wrapper = shallow(<App level={level} />);
    const top = wrapper.find(Container.Component).first();
    expect(top.children()).toHaveLength(4);
  });
  it('Renders container children', () => {
    level.parts.push({ type: 'container', name: 'parent' });
    level.parts.push({ type: 'toggle', parent: 'parent' }, { type: 'toggle', parent: 'parent' });
    const wrapper = shallow(<App level={level} />);
    const top = wrapper.find(Container.Component).first();
    expect(top.children().first().children()).toHaveLength(2);
  });
  it('Passes appropriate props to children', () => {
    level.parts.push({ type: 'toggle', size: '10'});
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('size')).toEqual('10');
  });
  it('Passes the IDs to children as props', () => {
    level.parts.push({ type: 'toggle', size: '10'});
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('id')).toBeDefined();
  });
  it('Passes a receiveAction callback as prop', () => {
    level.parts.push({ type: 'toggle', size: '10'});
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('receiveAction')).toBeDefined();
  });
});
