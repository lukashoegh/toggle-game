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
      input: 'toggle'
    }
  };
  connection = {
    from: '',
    output: 'toggle',
    to: 'test',
    input: '',
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
    it('Registered connection to the toggle output are triggered when a user action is received', () => {
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
      logic.input(action);
      expect(setConfigSpy.calledOnce).toBeTruthy();
      getConfigStub.returns('on');
      setConfigSpy.reset();
      logic.input(action);
      expect(setConfigSpy.calledOnce).toBeFalsy();
    });
  });
});