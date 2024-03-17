import { Entity } from '@/shared/domain/entities/entity';
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository';
import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string,
  ): Promise<StubEntity[]> {
    if (!filter) return items;

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}

describe('InMemorySearchableRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository;

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository();
  });

  describe('applyFilter method', () => {
    it('should not filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name', price: 10 })];
      const spyFilter = jest.spyOn(items, 'filter');
      const filteredItems = await sut['applyFilter'](items, null);
      expect(items).toStrictEqual(filteredItems);
      expect(spyFilter).not.toHaveBeenCalled();
    });

    it('should filter items using filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 10 }),
        new StubEntity({ name: 'TEST', price: 10 }),
        new StubEntity({ name: 'fake', price: 10 }),
      ];
      const spyFilter = jest.spyOn(items, 'filter');
      let filteredItems = await sut['applyFilter'](items, 'TEST');
      expect(filteredItems).toStrictEqual([items[0], items[1]]);
      expect(spyFilter).toHaveBeenCalledTimes(1);

      filteredItems = await sut['applyFilter'](items, 'test');
      expect(filteredItems).toStrictEqual([items[0], items[1]]);
      expect(spyFilter).toHaveBeenCalledTimes(2);

      filteredItems = await sut['applyFilter'](items, 'no-filter');
      expect(filteredItems).toHaveLength(0);
      expect(spyFilter).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort method', () => {
    it('should not sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 10 }),
        new StubEntity({ name: 'a', price: 10 }),
      ];
      let sortedItems = await sut['applySort'](items, 'price', null);
      expect(sortedItems).toStrictEqual(items);

      sortedItems = await sut['applySort'](items, null, null);
      expect(sortedItems).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
      ];

      let sortedItems = await sut['applySort'](items, 'name', 'asc');
      expect(sortedItems).toStrictEqual([items[1], items[0], items[2]]);

      sortedItems = await sut['applySort'](items, 'name', 'desc');
      expect(sortedItems).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'b', price: 50 }),
        new StubEntity({ name: 'c', price: 50 }),
        new StubEntity({ name: 'd', price: 50 }),
        new StubEntity({ name: 'e', price: 50 }),
      ];

      let itemsPaginated = await sut['applyPagination'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await sut['applyPagination'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await sut['applyPagination'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await sut['applyPagination'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe('search method', () => {
    it('should apply only pagination when the other params are null', async () => {
      const entity = new StubEntity({ name: 'test', price: 50 });
      const items = Array(11).fill(entity);
      sut.items = items;

      const params = await sut.search(new SearchParams());
      expect(params).toStrictEqual(
        new SearchResult({
          items: Array(10).fill(entity),
          total: 11,
          currentPage: 1,
          perPage: 10,
          sort: null,
          sortDir: null,
          filter: null,
        }),
      );
    });

    it('should apply paginate and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'a', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'TeSt', price: 50 }),
      ];
      sut.items = items;

      let params = await sut.search(
        new SearchParams({
          page: 1,
          perPage: 2,
          filter: 'TEST',
        }),
      );
      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[0], items[2]],
          total: 3,
          currentPage: 1,
          perPage: 2,
          sort: null,
          sortDir: null,
          filter: 'TEST',
        }),
      );

      params = await sut.search(
        new SearchParams({
          page: 2,
          perPage: 2,
          filter: 'TEST',
        }),
      );
      expect(params).toStrictEqual(
        new SearchResult({
          items: [items[3]],
          total: 3,
          currentPage: 2,
          perPage: 2,
          sort: null,
          sortDir: null,
          filter: 'TEST',
        }),
      );
    });
  });
});
