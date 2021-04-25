import pool from '../dbconfig/dbConnector';
import { Pairs } from '../utilities/models';

export const update_trading_pairs = async (pairs: Pairs[]) => {
  try {
    const client = await pool.connect();

    for (const pair of pairs) {
      const sql = `INSERT INTO trading_pairs (ticker_id, base_currency, target_currency) VALUES ('${pair.ticker_id}', '${pair.base}', '${pair.target}') ON CONFLICT DO NOTHING;`;
      // console.log(sql);
      await client.query(sql);
    }

    client.release();
    return (`Insertion of Trading_Pairs: ${pairs.length} successful!`);
  } catch (error) {
    console.log(error);
  }
};

export default { update_trading_pairs };
