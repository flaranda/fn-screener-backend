import 'reflect-metadata';

jest.mock('../../../inversify/InversifyContainerBuilder');

import { InversifyContainerBuilder } from '../../../inversify/InversifyContainerBuilder';
import { Script } from './Script';

class ScriptMock extends Script {
  public async run(): Promise<void> {
    return;
  }
}

describe('Script', () => {
  let inversifyContainerBuilderMock: jest.Mocked<InversifyContainerBuilder>;

  beforeAll(() => {
    inversifyContainerBuilderMock = {
      build: jest.fn(),
    } as Partial<InversifyContainerBuilder> as jest.Mocked<InversifyContainerBuilder>;

    (InversifyContainerBuilder as jest.Mock).mockReturnValue(
      inversifyContainerBuilderMock,
    );
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new ScriptMock();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should instantiate InversifyContainerBuilder', () => {
      expect(InversifyContainerBuilder).toHaveBeenCalledTimes(1);
      expect(InversifyContainerBuilder).toHaveBeenCalledWith();
    });

    it('should call InversifyContainerBuilder.build()', () => {
      expect(inversifyContainerBuilderMock.build).toHaveBeenCalledTimes(1);
      expect(inversifyContainerBuilderMock.build).toHaveBeenCalledWith();
    });
  });
});
