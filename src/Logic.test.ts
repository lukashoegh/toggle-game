import * as sinon from 'sinon';
import { GenericLogic, LogicCallbacks } from './Logic';
import { Connection } from './Connection';
import Action from './Action';

let getConfigStub = sinon.stub();
let setConfigSpy = sinon.stub();
let receiveActionSpy = sinon.stub();
let callbacks: LogicCallbacks = {
  getConfig: getConfigStub,
  setConfig: setConfigSpy,
  receiveAction: receiveActionSpy,
};
let logic: GenericLogic;
let connection: Connection;
let action: Action;

beforeEach(() => {
  getConfigStub.reset();
  getConfigStub.returns('off');
  setConfigSpy.reset();
  receiveActionSpy.reset();
  logic = new GenericLogic(callbacks);
  action = {
    connection: {
      from: '',
      output: '',
      to: '',
      input: 'toggle',
      id: 0,
    }
  };
  connection = {
    from: '',
    output: 'toggled',
    to: 'test',
    input: '',
    id: 0,
  };
});

describe('GenericLogic', () => {
  describe('Configured for toggle', () => {
    it('Receiving an action from user, when the state is off, sets the state to true', () => {
      action.connection.input = 'fromUser';
      logic.input(action);
      expect(setConfigSpy.calledWith('state', 'on')).toBeTruthy();
    });
    it('Receiving an action from user, when the state is off, sets the state to true', () => {
      getConfigStub.returns('on');
      action.connection.input = 'fromUser';
      logic.input(action);
      expect(setConfigSpy.calledWith('state', 'off')).toBeTruthy();
    });
    it('Connection to the toggle output is triggered when a user action is received', () => {
      logic.registerConnectionFrom(connection);
      action.connection.input = 'fromUser';
      logic.input(action);
      expect(receiveActionSpy.calledWith({ payload: 'on', connection: connection })).toBeTruthy();
    });
    it('Registering multiple connections', () => {
      logic.registerConnectionFrom(connection);
      logic.registerConnectionFrom(connection);
      logic.registerConnectionFrom(connection);
      action.connection.input = 'fromUser';
      logic.input(action);
      expect(receiveActionSpy.calledThrice).toBeTruthy();
    });
    it('Connections are not triggered when an action is input that isn\'t from the user', () => {
      logic.registerConnectionFrom(connection);
      logic.input(action);
      expect(receiveActionSpy.notCalled).toBeTruthy();
    });
    it('Connection to the turnOn input', () => {
      action.connection.input = 'turnOn';
      getConfigStub.returns('on');
      logic.input(action);
      expect(setConfigSpy.called).toBeFalsy();
      getConfigStub.returns('off');
      setConfigSpy.reset();
      logic.input(action);
      expect(setConfigSpy.calledWith('state', 'on')).toBeTruthy();
    });
    it('Connection to the turnOff input', () => {
      action.connection.input = 'turnOff';
      getConfigStub.returns('on');
      logic.input(action);
      expect(setConfigSpy.calledWith('state', 'off')).toBeTruthy();
      getConfigStub.returns('off');
      setConfigSpy.reset();
      logic.input(action);
      expect(setConfigSpy.called).toBeFalsy();
    });
    it('Connection to the fromPayload input', () => {
      action.connection.input = 'fromPayload';
      action.payload = 'on';
      logic.input(action);
      expect(setConfigSpy.calledWith('state', 'on')).toBeTruthy();
    });
    it('hasInput works as intended', () => {
      expect(logic.hasInput('toggle')).toBeTruthy();
      expect(logic.hasInput('turnOn')).toBeTruthy();
      expect(logic.hasInput('turnOff')).toBeTruthy();
      expect(logic.hasInput('fromPayload')).toBeTruthy();
      expect(logic.hasInput('spin')).toBeFalsy();
      expect(logic.hasInput('release')).toBeFalsy();
    });
    it('hasOutput works as intended', () => {
      expect(logic.hasOutput('toggled')).toBeTruthy();
      expect(logic.hasOutput('turnedOn')).toBeTruthy();
      expect(logic.hasOutput('turnedOff')).toBeTruthy();
      expect(logic.hasOutput('pressed')).toBeFalsy();
    });
  });
});