export const getValuesFromComplexObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  keys?: string[],
): (string | number)[] => {
  const values: (string | number)[] = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === 'string' || typeof value === 'number') {
      if (!keys || (keys && keys.includes(key))) {
        values.push(value);
      }
    } else {
      values.push(...getValuesFromComplexObject(value, keys));
    }
  });

  return values;
};
