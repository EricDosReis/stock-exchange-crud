import { ConnectionFactory } from './ConnectionFactory.js';
import { TradingDao } from '../domain/trading/TradingDao.js';

export function getTradingDao() {
  return ConnectionFactory
    .getConnection()
    .then(conn => new TradingDao(conn));
}
