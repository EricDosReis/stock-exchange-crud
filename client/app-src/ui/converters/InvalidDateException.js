import { ApplicationException } from '../../util/ApplicationException.js';

export class InvalidDateException extends ApplicationException {
  constructor() {
    super('The format must be dd/mm/aaaa');
  }
}
