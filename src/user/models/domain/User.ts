import { Entity } from '../../../common/models/domain/Entity';

export interface User extends Entity {
  readonly name: string;
  readonly email: string;
}
