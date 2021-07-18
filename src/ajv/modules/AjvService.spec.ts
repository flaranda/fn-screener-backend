import 'reflect-metadata';

jest.mock('ajv');

import Ajv from 'ajv';

import { AjvSchemaId } from '../models/AjvSchemaId';
import { AjvService } from './AjvService';

describe('AjvService', () => {
  let ajvValidateMock: jest.Mock;

  let ajvService: AjvService;

  beforeAll(() => {
    ajvValidateMock = jest.fn();

    (Ajv as unknown as jest.Mock).mockImplementation(() => ({
      validate: ajvValidateMock,
    }));

    ajvService = new AjvService();
  });

  describe('.validate()', () => {
    let ajvValidateReturnValueMock: boolean;

    beforeAll(() => {
      ajvValidateReturnValueMock = true;

      ajvValidateMock.mockReturnValue(ajvValidateReturnValueMock);
    });
    describe('when called', () => {
      let schemaIdFixture: AjvSchemaId;
      let valueFixture: unknown;
      let result: unknown;

      beforeAll(() => {
        schemaIdFixture = 'schema-id' as AjvSchemaId;
        valueFixture = {};

        result = ajvService.validate(schemaIdFixture, valueFixture);
      });

      it('should call ajv.validate()', () => {
        expect(ajvValidateMock).toHaveBeenCalledTimes(1);
        expect(ajvValidateMock).toHaveBeenCalledWith(
          schemaIdFixture,
          valueFixture,
        );
      });

      it('should return ajvValidateReturnValueMock', () => {
        expect(result).toBe(ajvValidateReturnValueMock);
      });
    });
  });
});
