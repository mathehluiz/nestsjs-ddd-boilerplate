import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found-error';
import { RepositoryInterface } from './repository-contract';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void | E> {
    this.items.push(entity);
    return entity;
  }

  async findById(id: string): Promise<E> {
    return this._get(id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    const index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }

  async update(entity: E): Promise<void | E> {
    await this._get(entity.id);
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
    return this.items[index];
  }

  protected async _get(id: string): Promise<E> {
    const _id = `${id}`;
    const entity = this.items.find((item) => item.id === _id);
    if (!entity) {
      throw new NotFoundError('Entity not found');
    }
    return entity;
  }
}
