import { LevelContextualDescription } from './Level';

class TestLevel implements LevelContextualDescription {
  public title = 'Test Level';
  public author = 'Lukas Høgh';
  public size = 15;
  public parts = [
    /*{
      type: 'trigger',
      size: 10,
      name: 't'
    },
    {
      input: 'turnOn'
    },
    {
      type: 'indicator',
      size: 20,
      name: 'i',
    },
    {
      type: 'button',
      size: 20,
    },
    {
      to: 'i',
      input: 'turnOff'
    },
    {
      type: 'toggle',
      size: 10,
    },
    {
      to: 't'
    },
    {
      to: 'i',
      input: 'toggle'
    },*/
    {
      type: 'spinner',
      label0: 'abc',
      label1: 'heyh',
      label2: 'tt',
      label3: 'int',
      label4: 'try',
      label5: 'catcheeeasasa',
      label6: 'shr',
      label7: 'foo',
      label8: 'bar',
      label9: 'net',
      label10: '',
      label11: 'dc',
    },
    {
      type: 'trigger',
      size: 10
    },
    {
      type: 'button',
      name: 'b'
    },
    {
      from: 'b',
      to: 'i'
    },
    {
      type: 'indicator',
      name: 'i'
    }
  ];
}

export default TestLevel;