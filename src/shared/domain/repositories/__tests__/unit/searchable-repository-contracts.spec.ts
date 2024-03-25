import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts';

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();
      expect(sut.page).toBe(1);

      const _ = [
        { page: null as any, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ].forEach((i) => {
        expect(new SearchParams({ page: i.page }).page).toEqual(i.expected);
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();
      expect(sut.perPage).toBe(10);

      const _ = [
        { perPage: null, expected: 10 },
        { perPage: undefined, expected: 10 },
        { perPage: '', expected: 10 },
        { perPage: 0, expected: 10 },
        { perPage: -1, expected: 10 },
        { perPage: 5.5, expected: 10 },
        { perPage: true, expected: 10 },
        { perPage: false, expected: 10 },
        { perPage: {}, expected: 10 },
        { perPage: 10, expected: 10 },
        { perPage: 2, expected: 2 },
        { perPage: 25 as any, expected: 25 },
      ].forEach((i) => {
        expect(new SearchParams({ perPage: i.perPage }).perPage).toEqual(
          i.expected,
        );
      });
    });

    it('sort prop', () => {
      const sut = new SearchParams();
      expect(sut.sort).toBeNull();

      const _ = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: '', expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 0, expected: '0' },
        { sort: -1, expected: '-1' },
        { sort: 5.5, expected: '5.5' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: {}, expected: '[object Object]' },
        { sort: 1, expected: '1' },
        { sort: 2, expected: '2' },
        { sort: 25 as any, expected: '25' },
      ].forEach((i) => {
        expect(new SearchParams({ sort: i.sort }).sort).toEqual(i.expected);
      });
    });

    it('sortDirection prop', () => {
      let sut = new SearchParams();
      expect(sut.sortDirection).toBeNull();

      sut = new SearchParams({ sort: null });
      expect(sut.sortDirection).toBeNull();

      sut = new SearchParams({ sort: undefined });
      expect(sut.sortDirection).toBeNull();

      sut = new SearchParams({ sort: '' });
      expect(sut.sortDirection).toBeNull();

      const _ = [
        { sortDirection: null, expected: 'desc' },
        { sortDirection: undefined, expected: 'desc' },
        { sortDirection: '', expected: 'desc' },
        { sortDirection: 'test', expected: 'desc' },
        { sortDirection: true, expected: 'desc' },
        { sortDirection: false, expected: 'desc' },
        { sortDirection: {}, expected: 'desc' },
        { sortDirection: 1, expected: 'desc' },
        { sortDirection: 2, expected: 'desc' },
        { sortDirection: 25 as any, expected: 'desc' },
        { sortDirection: 'asc', expected: 'asc' },
        { sortDirection: 'desc', expected: 'desc' },
        { sortDirection: 'ASC', expected: 'asc' },
        { sortDirection: 'DESC', expected: 'desc' },
      ].forEach((i) => {
        expect(
          new SearchParams({ sort: 'fakeSort', sortDir: i.sortDirection })
            .sortDirection,
        ).toEqual(i.expected);
      });
    });

    it('filter prop', () => {
      const sut = new SearchParams();
      expect(sut.filter).toBeNull();

      const _ = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: '', expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 0, expected: '0' },
        { filter: -1, expected: '-1' },
        { filter: 5.5, expected: '5.5' },
        { filter: true, expected: 'true' },
        { filter: false, expected: 'false' },
        { filter: {}, expected: '[object Object]' },
        { filter: 1, expected: '1' },
        { filter: 2, expected: '2' },
        { filter: 25 as any, expected: '25' },
      ].forEach((i) => {
        expect(new SearchParams({ filter: i.filter }).filter).toEqual(
          i.expected,
        );
      });
    });
  });

  describe('Search Result tests', () => {
    it('constructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 4,
        sort: null,
        sortDir: null,
        filter: null,
      });

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'],
        total: 4,
        currentPage: 1,
        perPage: 4,
        lastPage: 1,
        sort: null,
        sortDir: null,
        filter: null,
      });

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 4,
        sort: 'test',
        sortDir: 'asc',
        filter: 'testFilter',
      });

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'],
        total: 4,
        currentPage: 1,
        perPage: 4,
        lastPage: 1,
        sort: 'test',
        sortDir: 'asc',
        filter: 'testFilter',
      });

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'test',
        sortDir: 'asc',
        filter: 'testFilter',
      });

      expect(sut.lastPage).toBe(1);

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'test',
        sortDir: 'asc',
        filter: 'testFilter',
      });

      expect(sut.lastPage).toBe(6);
    });
  });
});
