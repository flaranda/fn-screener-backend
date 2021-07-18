import mongodb from 'mongodb';

import { CriteriaComplianceMongoDocument } from '../../models/mongo/CriteriaComplianceMongoDocument';
import { CriteriaComplianceMongoFixtures } from './CriteriaComplianceMongoFixtures';

export class CriteriaComplianceMongoDocumentFixtures {
  public static get withMandatory(): CriteriaComplianceMongoDocument {
    const fixture: CriteriaComplianceMongoDocument = {
      ...CriteriaComplianceMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f479ad50a298e4a7dd32e3'),
    } as CriteriaComplianceMongoDocument;

    return fixture;
  }
}
