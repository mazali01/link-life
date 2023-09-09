import { closeServer } from "./server";

let inMemoryStorage = {};
jest.mock("./fileDB/persist", () => ({
  readJson: async (path: string) => inMemoryStorage[path],
  writeJson: async (path: string, data: any) => {
    inMemoryStorage[path] = data
  },
}));

export const setInMemoryStorage = (data: any) => {
  inMemoryStorage = data;
}

afterAll(() => {
  closeServer();
});