import 'reflect-metadata';

import { EntityFixtures } from '../../common/fixtures/domain/EntityFixtures';
import { Entity } from '../../common/models/domain/Entity';
import { AjvSchemaId } from '../models/AjvSchemaId';
import { AjvService } from './AjvService';
import { AjvTypeGuard } from './AjvTypeGuard';

class AjvTypeGuardMock extends AjvTypeGuard<Entity> {
  constructor(
    protected readonly schemaId: AjvSchemaId,
    protected readonly ajvService: AjvService,
  ) {
    super(ajvService);
  }
}

describe('AjvTypeGuard', () => {
  let schemaIdFixture: AjvSchemaId;
  let ajvTypeGuardMock: AjvTypeGuardMock;
  let ajvService: jest.Mocked<AjvService>;

  beforeAll(() => {
    ajvService = {
      validate: jest.fn(),
    } as unknown as jest.Mocked<AjvService>;

    schemaIdFixture = 'schema-id' as AjvSchemaId;

    ajvTypeGuardMock = new AjvTypeGuardMock(schemaIdFixture, ajvService);
  });

  describe('.is()', () => {
    let ajvServiceReturnValueMock: boolean;

    beforeAll(() => {
      ajvServiceReturnValueMock = true;

      ajvService.validate.mockReturnValue(ajvServiceReturnValueMock);
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = ajvTypeGuardMock.is(EntityFixtures.withMandatory);
      });

      it('should call AjvService.validate', () => {
        expect(ajvService.validate).toHaveBeenCalledTimes(1);
        expect(ajvService.validate).toHaveBeenCalledWith(
          schemaIdFixture,
          EntityFixtures.withMandatory,
        );
      });

      it('should return ajvServiceReturnValueMock', () => {
        expect(result).toBe(ajvServiceReturnValueMock);
      });
    });
  });
});
