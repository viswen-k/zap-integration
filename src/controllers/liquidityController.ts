import pool from '../dbconfig/dbConnector';

class LiquidityController {

  public async get(req, res) {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM liquidity_changes";
      const { rows } = await client.query(sql);
      const lc_rows = rows;

      client.release();

      res.send(lc_rows);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default LiquidityController;
