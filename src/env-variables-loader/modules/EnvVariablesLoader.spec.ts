import 'reflect-metadata';

jest.mock('dotenv');
jest.mock('envalid');

import dotenv from 'dotenv';
import * as envalid from 'envalid';

(envalid.makeValidator as jest.Mock).mockReturnValue(jest.fn());

jest.mock('../../common/helpers/hasValue');

import { hasValue } from '../../common/helpers/hasValue';
import { EnvVariablesFixtures } from '../fixtures/EnvVariablesFixtures';
import { EnvVariablesLoader } from './EnvVariablesLoader';

describe('EnvVariablesLoader', () => {
  let oldProcessEnv: NodeJS.ProcessEnv;

  let envVariablesLoader: EnvVariablesLoader;

  beforeAll(() => {
    oldProcessEnv = process.env;

    process.env = {};

    (envalid.cleanEnv as jest.Mock).mockReturnValue(
      EnvVariablesFixtures.withMandatory,
    );

    (hasValue as unknown as jest.Mock).mockReturnValue(true);

    envVariablesLoader = new EnvVariablesLoader();
  });

  afterAll(() => {
    process.env = oldProcessEnv;
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      jest.clearAllMocks();

      new EnvVariablesLoader();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call envalid.cleanEnv()', () => {
      expect(envalid.cleanEnv).toHaveBeenCalledTimes(1);
      expect(envalid.cleanEnv).toHaveBeenCalledWith(
        process.env,
        expect.anything(),
        {},
      );
    });

    it('should call dotenv.config()', () => {
      const expected: dotenv.DotenvConfigOptions = {
        path: expect.stringContaining('.env') as string,
      };

      expect(dotenv.config).toHaveBeenCalledTimes(1);
      expect(dotenv.config).toHaveBeenCalledWith(expected);
    });
  });

  describe('.envVariables', () => {
    describe('when accessed', () => {
      let result: unknown;

      beforeAll(() => {
        result = envVariablesLoader.envVariables;
      });

      it('should return the env variables', () => {
        expect(result).toStrictEqual(EnvVariablesFixtures.withMandatory);
      });
    });

    describe('having an EnvVariablesLoader which could not load any variables', () => {
      beforeAll(() => {
        (hasValue as unknown as jest.Mock).mockReturnValueOnce(false);
      });

      describe('when accessed', () => {
        let result: unknown;

        beforeAll(() => {
          try {
            void envVariablesLoader.envVariables;
          } catch (error: unknown) {
            result = error;
          }
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
        });
      });
    });
  });

  describe('.load()', () => {
    describe('when called', () => {
      beforeAll(() => {
        envVariablesLoader.load();
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call envalid.cleanEnv()', () => {
        expect(envalid.cleanEnv).toHaveBeenCalledTimes(1);
        expect(envalid.cleanEnv).toHaveBeenCalledWith(
          process.env,
          expect.anything(),
          {},
        );
      });

      it('should call dotenv.config()', () => {
        const expected: dotenv.DotenvConfigOptions = {
          path: expect.stringContaining('/.env') as string,
        };

        expect(dotenv.config).toHaveBeenCalledTimes(1);
        expect(dotenv.config).toHaveBeenCalledWith(expected);
      });
    });
  });
});
