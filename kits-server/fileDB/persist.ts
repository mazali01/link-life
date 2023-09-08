import { promises as fs } from 'fs';

export class Persist {
  private _cache: { [key: string]: any } = {};

  public readJson = async <T>(path: string) => {
    if (!this._cache[path]) {
      this._cache[path] = await fs.readFile(path, "utf8").then(data => JSON.parse(data)) as T;
    }
    return this._cache[path] as T;
  }

  public writeJson = async <T>(path: string, data: T) => {
    this._cache[path] = data;
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }
}