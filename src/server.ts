import bodyParser from 'body-parser';
import express from 'express';
import pool from './dbconfig/dbConnector';
import liquidityRouter from './routers/liquidityRouter';
import zilRouter from './routers/zilRouter';
import print_endpoints from './utilities/print_endpoints';

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
  }

  private dbConnect() {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err);
      console.log('Connected');
    });
  }

  private routerConfig() {
    this.app.use('/liquidity', liquidityRouter);
    this.app.use('/zil', zilRouter);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
        print_endpoints(this.app);
      }).on('error', (err: Object) => reject(err));
    });
  }
}

export default Server;
