import { Entity } from '../../../common/models/domain/Entity';

export interface Criteria extends Entity {
  readonly name: string;
}
