import { Sequelize } from "sequelize";

export class DatasourceError extends Error { }

class Datasource {
  sources: { [index: string]: Sequelize } = {};

  constructor() {
      const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);
      sequelize.authenticate()
        .then(() => console.log(`connect datasource success`))
        .catch((e: any) => console.log(`datasource failed`, e));
      this.sources["zap-api"] = sequelize;
  }

  source(name: string) {
    if (!this.sources[name])
      throw new DatasourceError(`invalid datasource:${name}`);
    return this.sources[name];
  }
}

export default new Datasource();
