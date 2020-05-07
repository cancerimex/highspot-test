import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let filterPipe: FilterPipe;

  beforeEach(() => {
    filterPipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(filterPipe).toBeTruthy();
  });

  it('should return empty array if no items given', () => {
    const items = null;

    const filtered = filterPipe.transform(items, 'test');

    expect(filtered.length).toBe(0);
    expect(filtered).toEqual([]);
  });

  it('should return items if no value is given', () => {
    const items = [];
    items.push({ id: 1, value: 'test'});

    const filtered = filterPipe.transform(items, null);

    expect(filtered).toEqual(items);
  });

  it('should filter correctly', () => {
    const items = [];

    items.push({ id: 1, value: 'One'});
    items.push({ id: 2, value: 'Two'});
    items.push({ id: 3, value: 'Three'});
    items.push({ id: 4, value: 'Four'});

    const filtered = filterPipe.transform(items, 'One', 'value');

    expect(filtered.length).toBe(1);
  });

  it('should filter two items', () => {
    const items = [];

    items.push({ id: 1, value: 'One'});
    items.push({ id: 2, value: 'Two'});
    items.push({ id: 3, value: 'Three'});
    items.push({ id: 4, value: 'One'});

    const filtered = filterPipe.transform(items, 'One', 'value');

    expect(filtered.length).toBe(2);
  });
});

