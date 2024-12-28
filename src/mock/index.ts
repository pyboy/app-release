import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import fileModule from "./file/file";
import systemModule from "./system/index";
import userModule from "./user/index";
export function setupProdMockServer() {
  createProdMockServer([...fileModule, ...systemModule, ...userModule]);
}
