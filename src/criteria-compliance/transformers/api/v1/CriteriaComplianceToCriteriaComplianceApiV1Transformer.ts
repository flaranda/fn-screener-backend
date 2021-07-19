import * as inversify from 'inversify';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../../common/interfaces/ITransformer';
import { criteriaInjectionTypes } from '../../../../criteria/inversify/criteriaInjectionTypes';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { startupInjectionTypes } from '../../../../startup/inversify/startupInjectionTypes';
import { Startup } from '../../../../startup/models/domain/Startup';
import { StartupFindQuery } from '../../../../startup/models/domain/StartupFindQuery';
import { criteriaComplianceAnswerToCriteriaComplianceApiV1AnswerMap } from '../../../models/api/v1/criteriaComplianceAnswerToCriteriaComplianceApiV1AnswerMap';
import { CriteriaComplianceApiV1 } from '../../../models/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../../../models/domain/CriteriaCompliance';

@inversify.injectable()
export class CriteriaComplianceToCriteriaComplianceApiV1Transformer
  implements ITransformer<CriteriaCompliance, CriteriaComplianceApiV1>
{
  constructor(
    @inversify.inject(criteriaInjectionTypes.FindOneCriteriaInteractor)
    private readonly findOneCriteriaInteractor: IInteractor<
      CriteriaFindQuery,
      Criteria
    >,
    @inversify.inject(startupInjectionTypes.FindOneStartupInteractor)
    private readonly findOneStartupInteractor: IInteractor<
      StartupFindQuery,
      Startup
    >,
  ) {}

  public async transform(
    criteriaCompliance: CriteriaCompliance,
  ): Promise<CriteriaComplianceApiV1> {
    const criteria: Criteria = await this.transformToCriteria(
      criteriaCompliance,
    );
    const startup: Startup = await this.transformToStartup(criteriaCompliance);

    const criteriaComplianceApiV1: CriteriaComplianceApiV1 = {
      answer:
        criteriaComplianceAnswerToCriteriaComplianceApiV1AnswerMap[
          criteriaCompliance.answer
        ],
      criteria_name: criteria.name,
      criteria_uuid: criteria.uuid,
      startup_name: startup.name,
      startup_uuid: startup.uuid,
      uuid: criteriaCompliance.uuid,
    };

    return criteriaComplianceApiV1;
  }

  private async transformToCriteria(
    criteriaCompliance: CriteriaCompliance,
  ): Promise<Criteria> {
    const criteriaFindQuery: CriteriaFindQuery = {
      uuid: criteriaCompliance.criteriaUuid,
    };

    const criteria: Criteria = await this.findOneCriteriaInteractor.interact(
      criteriaFindQuery,
    );

    return criteria;
  }

  private async transformToStartup(
    criteriaCompliance: CriteriaCompliance,
  ): Promise<Startup> {
    const startupFindQuery: StartupFindQuery = {
      uuid: criteriaCompliance.startupUuid,
    };

    const startup: Startup = await this.findOneStartupInteractor.interact(
      startupFindQuery,
    );

    return startup;
  }
}
