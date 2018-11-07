import { ApplicationException } from '../../util/ApplicationException';

export class InvalidDateException extends ApplicationException {
  constructor() {
    super('The format must be dd/mm/aaaa');
  }
}
