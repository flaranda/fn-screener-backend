import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { criteriaComplianceInjectionTypes } from '../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../../criteria-compliance/models/domain/CriteriaCompliance';
import { CriteriaComplianceAnswer } from '../../criteria-compliance/models/domain/CriteriaComplianceAnswer';
import { CriteriaComplianceFindQuery } from '../../criteria-compliance/models/domain/CriteriaComplianceFindQuery';
import { selectedCriteriaInjectionTypes } from '../../selected-criteria/inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../../selected-criteria/models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../../selected-criteria/models/domain/SelectedCriteriaFindQuery';
import { SelectedCriteriaImportance } from '../../selected-criteria/models/domain/SelectedCriteriaImportance';
import { MatchingAnalysis } from '../models/domain/MatchingAnalysis';
import { MatchingAnalysisCriteriaResult } from '../models/domain/MatchingAnalysisCriteriaResult';
import { MatchingAnalysisGenerationQuery } from '../models/domain/MatchingAnalysisGenerationQuery';

@inversify.injectable()
export class GenerateMatchingAnalysisInteractor
  implements IInteractor<MatchingAnalysisGenerationQuery, MatchingAnalysis>
{
  private readonly MUST_HAVE_CRITERIA_WEIGHT: number = 0.5;
  private readonly NICE_TO_HAVE_CRITERIA_WEIGHT: number = 0.2;
  private readonly SUPER_NICE_TO_HAVE_CRITERIA_WEIGHT: number = 0.3;

  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.FindManySelectedCriteriasInteractor,
    )
    private readonly findManySelectedCriteriasInteractor: IInteractor<
      SelectedCriteriaFindQuery,
      SelectedCriteria[]
    >,
    @inversify.inject(
      criteriaComplianceInjectionTypes.FindManyCriteriaCompliancesInteractor,
    )
    private readonly findManyCriteriaCompliancesInteractor: IInteractor<
      CriteriaComplianceFindQuery,
      CriteriaCompliance[]
    >,
  ) {}

  public async interact(
    matchingAnalysisGenerationQuery: MatchingAnalysisGenerationQuery,
  ): Promise<MatchingAnalysis> {
    const selectedCriterias: SelectedCriteria[] =
      await this.findSelectedCriteriasByUserUuid(
        matchingAnalysisGenerationQuery.userUuid,
      );

    const criteriaCompliances: CriteriaCompliance[] =
      await this.findCriteriaCompliancesByStartupUuid(
        matchingAnalysisGenerationQuery.startupUuid,
      );

    const matchingAnalysis: MatchingAnalysis =
      await this.generateMatchingAnalysis(
        selectedCriterias,
        criteriaCompliances,
      );

    return matchingAnalysis;
  }

  private async findSelectedCriteriasByUserUuid(
    userUuid: string,
  ): Promise<SelectedCriteria[]> {
    const selectedCriteriaFindQuery: SelectedCriteriaFindQuery = {
      userUuid: userUuid,
    };

    const selectedCriterias: SelectedCriteria[] =
      await this.findManySelectedCriteriasInteractor.interact(
        selectedCriteriaFindQuery,
      );

    return selectedCriterias;
  }

  private async findCriteriaCompliancesByStartupUuid(
    startupUuid: string,
  ): Promise<CriteriaCompliance[]> {
    const criteriaComplianceFindQuery: CriteriaComplianceFindQuery = {
      startupUuid: startupUuid,
    };

    const criteriaCompliances: CriteriaCompliance[] =
      await this.findManyCriteriaCompliancesInteractor.interact(
        criteriaComplianceFindQuery,
      );

    return criteriaCompliances;
  }

  private async generateMatchingAnalysis(
    selectedCriterias: SelectedCriteria[],
    criteriaCompliances: CriteriaCompliance[],
  ): Promise<MatchingAnalysis> {
    const [
      score,
      mustHaveCriteriaResult,
      niceToHaveCriteriaResult,
      superNiceToHaveCriteriaResult,
    ]: [
      score: number,
      mustHaveCriteriaResult: MatchingAnalysisCriteriaResult,
      niceToHaveCriteriaResult: MatchingAnalysisCriteriaResult,
      superNiceToHaveCriteriaResult: MatchingAnalysisCriteriaResult,
    ] = await Promise.all([
      this.calculateScore(selectedCriterias, criteriaCompliances),
      this.calculateCriteriaResultByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.MustHave,
      ),
      this.calculateCriteriaResultByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.NiceToHave,
      ),
      this.calculateCriteriaResultByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.SuperNiceToHave,
      ),
    ]);

    const matchingAnalysis: MatchingAnalysis = {
      mustHaveCriteriaResult: mustHaveCriteriaResult,
      niceToHaveCriteriaResult: niceToHaveCriteriaResult,
      score: score,
      superNiceToHaveCriteriaResult: superNiceToHaveCriteriaResult,
    };

    return matchingAnalysis;
  }

  private async calculateScore(
    selectedCriterias: SelectedCriteria[],
    criteriaCompliances: CriteriaCompliance[],
  ): Promise<number> {
    const [mustHaveSubscore, niceToHaveSubscore, superNiceToHaveSubscore]: [
      number,
      number,
      number,
    ] = await Promise.all([
      this.calculateSubscoreByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.MustHave,
      ),
      this.calculateSubscoreByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.NiceToHave,
      ),
      this.calculateSubscoreByImportance(
        selectedCriterias,
        criteriaCompliances,
        SelectedCriteriaImportance.SuperNiceToHave,
      ),
    ]);

    const totalWeight: number =
      this.MUST_HAVE_CRITERIA_WEIGHT +
      this.NICE_TO_HAVE_CRITERIA_WEIGHT +
      this.SUPER_NICE_TO_HAVE_CRITERIA_WEIGHT;

    const totalSubscore: number =
      mustHaveSubscore * this.MUST_HAVE_CRITERIA_WEIGHT +
      niceToHaveSubscore * this.NICE_TO_HAVE_CRITERIA_WEIGHT +
      superNiceToHaveSubscore * this.SUPER_NICE_TO_HAVE_CRITERIA_WEIGHT;

    const score: number = totalSubscore / totalWeight;

    return score;
  }

  private async calculateSubscoreByImportance(
    selectedCriterias: SelectedCriteria[],
    criteriaCompliances: CriteriaCompliance[],
    importance: SelectedCriteriaImportance,
  ): Promise<number> {
    return new Promise((resolve: (importanceSubscore: number) => void) => {
      const filteredSelectedCriterias: SelectedCriteria[] =
        this.filterSelectedCriteriasByImportance(selectedCriterias, importance);

      const accomplishedSelectedCriterias: SelectedCriteria[] =
        this.filterSelectedCriteriasByCriteriaComplianceAnswer(
          filteredSelectedCriterias,
          criteriaCompliances,
          CriteriaComplianceAnswer.Yes,
        );

      const importanceSubscore: number =
        accomplishedSelectedCriterias.length / filteredSelectedCriterias.length;

      resolve(importanceSubscore);
    });
  }

  private async calculateCriteriaResultByImportance(
    selectedCriterias: SelectedCriteria[],
    criteriaCompliances: CriteriaCompliance[],
    importance: SelectedCriteriaImportance,
  ): Promise<MatchingAnalysisCriteriaResult> {
    const filteredSelectedCriteriasByImportance: SelectedCriteria[] =
      this.filterSelectedCriteriasByImportance(selectedCriterias, importance);

    const accomplishedSelectedCriterias: SelectedCriteria[] =
      this.filterSelectedCriteriasByCriteriaComplianceAnswer(
        filteredSelectedCriteriasByImportance,
        criteriaCompliances,
        CriteriaComplianceAnswer.Yes,
      );

    const nonAccomplishedSelectedCriterias: SelectedCriteria[] =
      this.filterSelectedCriteriasByCriteriaComplianceAnswer(
        filteredSelectedCriteriasByImportance,
        criteriaCompliances,
        CriteriaComplianceAnswer.No,
      );

    const unansweredSelectedCriterias: SelectedCriteria[] =
      this.filterSelectedCriteriasByCriteriaComplianceAnswer(
        filteredSelectedCriteriasByImportance,
        criteriaCompliances,
        CriteriaComplianceAnswer.NoAnswer,
      );

    const matchingAnalysisCriteriaResult: MatchingAnalysisCriteriaResult = {
      accomplished: accomplishedSelectedCriterias.length,
      nonAccomplished: nonAccomplishedSelectedCriterias.length,
      unanswered: unansweredSelectedCriterias.length,
    };

    return matchingAnalysisCriteriaResult;
  }

  private filterSelectedCriteriasByImportance(
    selectedCriterias: SelectedCriteria[],
    importance: SelectedCriteriaImportance,
  ): SelectedCriteria[] {
    const filteredSelectedCriterias: SelectedCriteria[] =
      selectedCriterias.filter(
        (selectedCriteria: SelectedCriteria) =>
          selectedCriteria.importance === importance,
      );

    return filteredSelectedCriterias;
  }

  private filterSelectedCriteriasByCriteriaComplianceAnswer(
    selectedCriterias: SelectedCriteria[],
    criteriaCompliances: CriteriaCompliance[],
    answer: CriteriaComplianceAnswer,
  ): SelectedCriteria[] {
    const filteredSelectedCriterias: SelectedCriteria[] =
      selectedCriterias.filter((selectedCriteria: SelectedCriteria) =>
        criteriaCompliances.some(
          (criteriaCompliance: CriteriaCompliance) =>
            criteriaCompliance.criteriaUuid === selectedCriteria.criteriaUuid &&
            criteriaCompliance.answer === answer,
        ),
      );

    return filteredSelectedCriterias;
  }
}
