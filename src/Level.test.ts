import { LevelContextualDescription, decontextualizeLevelDescription } from './Level';
describe('decontextualizeLevelDescription', () => {
  it('Sets from in connections where it is missing', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          type: 'toggle',
          name: 'foo'
        },
        {
          to: 'bar',
          input: 'foo',
          output: 'bar'
        },
        {
          type: 'toggle',
          name: 'bar'
        },
      ],
    };
    let decontextualized = decontextualizeLevelDescription(level);
    expect(decontextualized.parts[1]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: 'foo',
        output: 'bar',
      }
    );
  });
  it('Sets to in connections where it is missing', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          type: 'toggle',
          name: 'foo'
        },
        {
          from: 'foo',
          input: 'foo',
          output: 'bar'
        },
        {
          type: 'toggle',
          name: 'bar'
        },
      ],
    };
    let decontextualized = decontextualizeLevelDescription(level);
    expect(decontextualized.parts[1]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: 'foo',
        output: 'bar',
      }
    );
  });
  it('Sets to and from in connections where it is missing', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          type: 'toggle',
          name: 'foo'
        },
        {
        },
        {
          type: 'toggle',
          name: 'bar'
        },
      ],
    };
    let decontextualized = decontextualizeLevelDescription(level);
    expect(decontextualized.parts[1]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: undefined,
        output: undefined,
      }
    );
  });
  it('Handles multiple missing tos', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          type: 'toggle',
          name: 'foo'
        },
        {
          output: 'one',
          input: 'one',
        },
        {
          output: 'two',
          input: 'two',
        },
        {
          output: 'three',
          input: 'three',
        },
        {
          type: 'toggle',
          name: 'bar'
        },
      ],
    };
    let decontextualized = decontextualizeLevelDescription(level);
    expect(decontextualized.parts[1]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: 'one',
        output: 'one',
      }
    );
    expect(decontextualized.parts[2]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: 'two',
        output: 'two',
      }
    );
    expect(decontextualized.parts[3]).toEqual(
      {
        to: 'bar',
        from: 'foo',
        input: 'three',
        output: 'three',
      }
    );
  });
  it('Throws if the first connection is missing a from field', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          to: 'bar',
          input: 'foo',
          output: 'bar'
        },
        {
          type: 'toggle',
          name: 'bar'
        },
      ],
    };
    expect(() => decontextualizeLevelDescription(level)).toThrow();
  });
  it('Throws if the last connection is missing a to field', () => {
    let level: LevelContextualDescription = {
      title: 'test title',
      author: 'test author',
      parts: [
        {
          type: 'toggle',
          name: 'bar'
        },
        {
          input: 'foo',
          output: 'bar'
        },
      ],
    };
    expect(() => decontextualizeLevelDescription(level)).toThrow();
  });
});