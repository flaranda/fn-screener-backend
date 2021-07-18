import 'reflect-metadata';
import { ITypeGuard } from '../../../../common/interfaces/ITypeGuard';
import { RequestWithContext } from '../../../../server/models/RequestWithContext';
import { SelectedCriteriaApiV1UpdateQueryFixtures } from '../../../fixtures/api/v1/SelectedCriteriaApiV1UpdateQueryFixtures';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { PutV1SelectedCriteriasRequestParser } from './PutV1SelectedCriteriasRequestParser';

describe('PutV1SelectedCriteriasRequestParser', () => {
  let selectedCriteriaApiV1UpdateQueryTypeGuard: jest.Mocked<
    ITypeGuard<SelectedCriteriaApiV1UpdateQuery>
  >;

  let putV1SelectedCriteriasRequestParser: PutV1SelectedCriteriasRequestParser;

  beforeAll(() => {
    selectedCriteriaApiV1UpdateQueryTypeGuard = {
      is: jest.fn(),
    } as unknown as jest.Mocked<ITypeGuard<SelectedCriteriaApiV1UpdateQuery>>;

    putV1SelectedCriteriasRequestParser =
      new PutV1SelectedCriteriasRequestParser(
        selectedCriteriaApiV1UpdateQueryTypeGuard,
      );
  });

  describe('.parse()', () => {
    describe('having a Request with a body containing a SelectedCriteriaApiV1UpdateQuery', () => {
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestFixture = {
          body: SelectedCriteriaApiV1UpdateQueryFixtures.withMandatory,
        } as Partial<RequestWithContext> as RequestWithContext;

        selectedCriteriaApiV1UpdateQueryTypeGuard.is.mockReturnValueOnce(true);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          result = await putV1SelectedCriteriasRequestParser.parse(
            requestFixture,
          );
        });

        it('should call SelectedCriteriaApiV1UpdateQueryTypeGuard.is()', () => {
          expect(
            selectedCriteriaApiV1UpdateQueryTypeGuard.is,
          ).toHaveBeenCalledTimes(1);
          expect(
            selectedCriteriaApiV1UpdateQueryTypeGuard.is,
          ).toHaveBeenCalledWith(requestFixture.body);
        });

        it('should return a SelectedCriteriaApiV1UpdateQuery', () => {
          expect(result).toStrictEqual(
            SelectedCriteriaApiV1UpdateQueryFixtures.withMandatory,
          );
        });
      });
    });

    describe('having a Request with an invalid body', () => {
      let requestFixture: RequestWithContext;

      beforeAll(() => {
        requestFixture = {
          body: 'invalid body',
        } as Partial<RequestWithContext> as RequestWithContext;

        selectedCriteriaApiV1UpdateQueryTypeGuard.is.mockReturnValueOnce(false);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          try {
            await putV1SelectedCriteriasRequestParser.parse(requestFixture);
          } catch (err) {
            result = err;
          }
        });

        it('should call SelectedCriteriaApiV1UpdateQueryTypeGuard.is()', () => {
          expect(
            selectedCriteriaApiV1UpdateQueryTypeGuard.is,
          ).toHaveBeenCalledTimes(1);
          expect(
            selectedCriteriaApiV1UpdateQueryTypeGuard.is,
          ).toHaveBeenCalledWith(requestFixture.body);
        });

        it('should throw an Error', () => {
          expect(result).toBeInstanceOf(Error);
        });
      });
    });
  });
});
