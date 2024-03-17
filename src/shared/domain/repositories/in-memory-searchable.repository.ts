import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory.repository';
import {
  SearchParams,
  SearchableRepositoryInterface,
  SearchResult,
} from './searchable-repository-contracts';

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sortDirection,
    );
    const itemsPaginated = await this.applyPagination(
      itemsSorted,
      props.page,
      props.perPage,
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDir: props.sortDirection,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sortDir: 'asc' | 'desc' | null,
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }
    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (a.props[sort] > b.props[sort]) {
        return sortDir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  protected async applyPagination(
    items: E[],
    page: SearchParams['page'],
    perPage: SearchParams['perPage'],
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const limit = start + perPage;

    return items.slice(start, limit);
  }
}
