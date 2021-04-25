import { Model } from "sequelize";

class Pair extends Model{
  ticker_id: string;
  base: string;
  target: string;

  toJSON(): object {
    var values: any = Object.assign({}, this.get());
    return values;
  }
}

export default Pair;
