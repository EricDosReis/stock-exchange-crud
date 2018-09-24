class DaoFactory {
  static getTradingDao() {
    return ConnectionFactory
      .getConnection()
      .then(conn => new TradingDao(conn));
  }
}
