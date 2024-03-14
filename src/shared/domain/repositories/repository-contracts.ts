import { Entity } from '../entities/entity';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void | E>;
  update(entity: E): Promise<void | E>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;
}
