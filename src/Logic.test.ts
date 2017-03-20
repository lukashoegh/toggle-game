import * as sinon from 'sinon';
import { LogicCallbacks, Logic } from './Logic';
import { Connection } from './Connection';
import Action from './Action';
import Toggle from './Parts/Toggle/Toggle';
import Button from './Parts/Button/Button';

let getConfigStub = sinon.stub();
let setConfigSpy = sinon.stub();
let receiveActionSpy = sinon.stub();
let callbacks: LogicCallbacks = {
  getConfig: getConfigStub,
  setConfig: setConfigSpy,
  receiveAction: receiveActionSpy,
};
let logic: Logic;
let connection: Connection;
let action: Action;

describe('GenericLogic', () => {

  beforeEach(() => {
    getConfigStub.reset();
    getConfigStub.returns('off');
    setConfigSpy.reset();
    receiveActionSpy.reset();
  });

  describe('Configured for toggle', () => {

    beforeEach(() => {
      logic = Toggle.Logic(callbacks);
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
        output: 'toggle',
        to: 'test',
        input: '',
        id: 0,
      };
    });

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
      expect(logic.hasOutput('toggle')).toBeTruthy();
      expect(logic.hasOutput('turnOn')).toBeTruthy();
      expect(logic.hasOutput('turnOff')).toBeTruthy();
      expect(logic.hasOutput('pressed')).toBeFalsy();
    });
  });
  describe('Configured for button', () => {

    beforeEach(() => {
      logic = Button.Logic(callbacks);
      action = {
        connection: {
          from: '',
          output: '',
          to: '',
          input: 'fromUser',
          id: 0,
        }
      };
      connection = {
        from: '',
        output: 'press',
        to: 'test',
        input: '',
        id: 0,
      };
    });

    it('Pressing the button triggers the connection', () => {
      logic.registerConnectionFrom(connection);
      logic.input(action);
      expect(receiveActionSpy.calledWith({ payload: 'on', connection: connection })).toBeTruthy();
    });
  });
});