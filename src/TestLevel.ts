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
        size: 10,
        name: 'i'
    },
    {
        type: 'button',
        size: 10
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
        to: 'i',
        input: 'toggle'
    },
    {
        to: 't',
        input: 'release'
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
    }
  ];
}

export default TestLevel;