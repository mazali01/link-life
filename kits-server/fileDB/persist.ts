import fs from 'fs';


export class Persist {
  private _cache: { [key: string]: any } = {};

  public readJson = async <T>(path: string) => {
    if (!this._cache[path]) {
      this._cache[path] = await this.readJsonAsync<T>(path);
    }
    return this._cache[path] as T;
  }

  public writeJson = async <T>(path: string, data: T) => {
    this._cache[path] = data;
    await this.writeJsonAsync(path, data);
  }

  private readJsonAsync = <T>(path: string) => {
    return new Promise<T>((resolve, reject) => fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data) as T)
      }
    }));
  }

  private writeJsonAsync = <T>(path: string, data: T) => {
    return new Promise<void>((resolve, reject) => fs.writeFile(path, JSON.stringify(data, null, 2), { encoding: "utf8", flag: "w" }, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    }));
  }
}