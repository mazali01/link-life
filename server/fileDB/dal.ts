import path from 'path';
import persist from './persist';

export class Dal<T> {
  constructor(private dbPath: string) { }

  async findOne(query: Partial<T>) {
    const items = await persist.readJson<T[]>(this.dbPath);

    const isMatch = (item: T) => {
      return Object.keys(query).every(key => item[key] === query[key]);
    }

    const item = items.find(isMatch);
    return item;
  }

  async findMany(isMatch: (item: T) => boolean) {
    const items = await persist.readJson<T[]>(this.dbPath);
    const result = items.filter(isMatch);
    return result;
  }

  async update(filter: (item: T) => boolean, getUpdatedItem: (oldItem: T) => T) {
    const items = await persist.readJson<T[]>(this.dbPath);

    const updatedItems = items.map(item => filter(item) ? getUpdatedItem(item) : item);

    await persist.writeJson(this.dbPath, updatedItems);
  }

  async findMatch(isMatch: (item: T) => boolean) {
    const items = await persist.readJson<T[]>(this.dbPath);
    const result = items.filter(isMatch);
    return result;
  }

  async create(item: T) {
    const items = await persist.readJson<T[]>(this.dbPath);
    items.push(item);
    await persist.writeJson(this.dbPath, items);
  }


  async delete(selector: (item: T) => boolean) {
    const items = await persist.readJson<T[]>(this.dbPath);
    const updatedItems = items.filter(item => !selector(item));
    await persist.writeJson(this.dbPath, updatedItems);
  }
}
