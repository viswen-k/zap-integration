import { Zilswap } from 'zilswap-sdk';
import { Network } from 'zilswap-sdk/lib/constants';
import spot_exchanges from '../services/spot_exchanges';
import { Pairs } from '../utilities/models';

class ZilController {

  public async getPool(req, res) {
    const zilswap = new Zilswap(Network.MainNet);
    await zilswap.initialize();
    const pool = await zilswap.getPool("zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t");
    //getRatesForInput(`zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t`, `zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz`, `1`);
    await zilswap.teardown();

    console.log(`Res:`, pool);
    res.send(pool);
  };

  public async getTokens(req, res) {
    const zilTokens = await fetch(`https://api.zilstream.com/tokens`);
    const tokens = await zilTokens.json();

    const store: string[] = [];
    for (const token of tokens) {
      store.push(token.symbol);
    }
    const pairs: Pairs[] = [];
    for (const base of store) {
      for (const target of store) {
        if (!base.match(target)) {
          const pair: Pairs = { base: base, target: target, ticker_id: base + "_" + target };
          pairs.push(pair);
        }
      }
    }
    
    const reply = await spot_exchanges.update_trading_pairs(pairs);
    res.send(reply);
  };
};

export default ZilController;
