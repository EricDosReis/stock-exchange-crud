import { ConnectionFactory } from './ConnectionFactory';
import { TradingDao } from '../domain/trading/TradingDao';

export async function getTradingDao() {
  let conn = await ConnectionFactory.getConnection();

  return new TradingDao(conn);
}
