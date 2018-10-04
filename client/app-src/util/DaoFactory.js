import { ConnectionFactory } from './ConnectionFactory.js';
import { TradingDao } from '../domain/trading/TradingDao.js';

export async function getTradingDao() {
  let conn = await ConnectionFactory.getConnection();

  return new TradingDao(conn);
}
