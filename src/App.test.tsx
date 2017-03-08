import * as React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import Level from './Level';
import LevelTitle from './LevelTitle';
import LevelFooter from './LevelFooter';
import Toggle from './Parts/Toggle/Toggle';
import Container from './Parts/Container/Container';
import EmptyLevel from './EmptyLevel';
import * as sinon from 'sinon';

let level: Level;

describe('<App /> Rendering', () => {

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
    level.parts.push({ type: 'toggle', size: '10' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('size')).toEqual('10');
  });
  it('Passes the IDs to children as props', () => {
    level.parts.push({ type: 'toggle', size: '10' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('id')).toBeDefined();
  });
  it('Passes a receiveAction callback as prop', () => {
    level.parts.push({ type: 'toggle', size: '10' });
    const wrapper = shallow(<App level={level} />);
    expect(wrapper.find(Toggle.Component).first().prop('receiveAction')).toBeDefined();
  });
});

describe('<App /> Logics', () => {
  let spy: sinon.SinonSpy;
  let stub: sinon.SinonStub;

  beforeEach(() => {
    level = new EmptyLevel();
  });
  afterEach(() => {
    spy.restore();
  });
  it('Creates a toggle logic', () => {
    spy = sinon.spy(Toggle, 'Logic');
    level.parts.push({ type: 'toggle' });
    shallow(<App level={level} />);
    expect(spy.called).toBeTruthy();
  });
  it('Creates a logic for each part', () => {
    spy = sinon.spy(Toggle, 'Logic');
    level.parts.push({ type: 'toggle' }, { type: 'toggle' }, { type: 'toggle' });
    shallow(<App level={level} />);
    expect(spy.calledThrice).toBeTruthy();
  });
  it('A logic can read its state by doing getConfig calls', () => {
    spy = sinon.spy(Toggle, 'Logic');
    level.parts.push({ type: 'toggle', state: 'on' }, { type: 'toggle' });
    shallow(<App level={level} />);
    expect(spy.firstCall.args[0]('state')).toEqual('on');
    expect(spy.secondCall.args[0]('state')).toEqual('off');
  });
  it('A logic can modify its component by doing setConfig calls', () => {
    spy = sinon.spy(Toggle, 'Logic');
    level.parts.push({ type: 'toggle' });
    const wrapper = shallow(<App level={level} />);
    spy.firstCall.args[1]('state', 'on');
    expect(wrapper.find(Toggle.Component).first().prop('state')).toEqual('on');
  });
  it('Clicking a toggle triggers the corresponding logic', () => {
    let triggerSpy = sinon.spy();
    stub = sinon.stub(Toggle, 'Logic', () => ({
      trigger: triggerSpy
    }));
    level.parts.push({ type: 'toggle' });
    const wrapper = mount(<App level={level} />);
    wrapper.find(Toggle.Component).first().simulate('click');
    expect(triggerSpy.called).toBeTruthy();
  });
});
