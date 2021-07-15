import 'reflect-metadata';

import * as inversify from 'inversify';

import { InversifyContainerBuilder } from './InversifyContainerBuilder';

@inversify.injectable()
class ModuleMock {}

class ContainerModuleMock extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(ModuleMock).to(ModuleMock);
    };

    super(registry);
  }
}

describe('InversifyContainerBuilder integration', () => {
  let inversifyContainerBuilder: InversifyContainerBuilder;

  describe('with inversify library', () => {
    beforeAll(() => {
      inversifyContainerBuilder = new InversifyContainerBuilder([
        ContainerModuleMock,
      ]);
    });

    describe('.build()', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(() => {
          result = inversifyContainerBuilder.build();
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should return an inversify.Container instance with ContainerModuleMock loaded', () => {
          const expected: unknown = (result as inversify.Container).get(
            ModuleMock,
          );

          expect(result).toBeInstanceOf(inversify.Container);
          expect(expected).toBeInstanceOf(ModuleMock);
        });
      });
    });
  });
});
