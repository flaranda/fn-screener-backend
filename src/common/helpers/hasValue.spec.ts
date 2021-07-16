import 'reflect-metadata';

import { hasValue } from './hasValue';

describe('hasValue()', () => {
  describe('having a null value', () => {
    let value: null;

    beforeAll(() => {
      value = null;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = hasValue(value);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having an undefined value', () => {
    let value: undefined;

    beforeAll(() => {
      value = undefined;
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = hasValue(value);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a value different than null or undefined', () => {
    let value: unknown;

    beforeAll(() => {
      value = '';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = hasValue(value);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});
