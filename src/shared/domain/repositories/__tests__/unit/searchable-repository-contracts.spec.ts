import { SearchParams } from '../../searchable-repository-contracts';

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
  });
});
