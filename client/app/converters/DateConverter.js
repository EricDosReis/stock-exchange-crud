class DateConverter {
  constructor() {
    throw new Error('DateConverter class cannot be instantiated');
  }

  static toString(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static toDate(dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      throw new Error('The format must be aaaa-mm-dd');
    }

    return new Date(...dateString.split('-').map((item, i) => item - i % 2));
  }
}
