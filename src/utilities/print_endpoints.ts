import { Express } from "express";
import list_endpoints from "express-list-endpoints";

export default (app: Express) => {
  const endpoints = list_endpoints(app);
  const lines = endpoints.reduce((accum: string[], route) => {
    const { methods, path } = route;
    return accum.concat(methods.map((method: string) => {
      return `  ${method}       `.substring(0, 9) + path;
    }))
  }, []);
  console.log(`endpoints list:\n${lines.join("\n")}`);
}
