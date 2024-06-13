import { getValuesFromComplexObject } from '@/utils/object';

describe('object', () => {
  test('object', () => {
    // GIVEN
    const obj = { a: 1, b: 2, c: 3 };

    // WHEN
    const values = getValuesFromComplexObject(obj);

    // THEN
    expect(values).toEqual([1, 2, 3]);
  });

  test('big object', () => {
    // GIVEN
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 4,
        e: 5,
        f: {
          g: 7,
          h: 8,
          i: {
            j: 10,
          },
        },
      },
    };

    // WHEN
    const values = getValuesFromComplexObject(obj);

    // THEN
    expect(values).toEqual([1, 2, 4, 5, 7, 8, 10]);
  });

  test('big object with keys', () => {
    // GIVEN
    const obj = {
      a: 1,
      b: 2,
      c: {
        d: 4,
        e: 5,
        f: {
          g: 7,
          h: 8,
          i: {
            j: 10,
          },
        },
      },
    };

    // WHEN
    const values = getValuesFromComplexObject(obj, ['a', 'c', 'j']);

    // THEN
    expect(values).toEqual([1, 10]);
  });
});
