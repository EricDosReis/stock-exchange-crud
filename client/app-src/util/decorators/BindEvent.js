import { required } from '../../util';

export function bindEvent(
  event = required('event'),
  selector = required('selector'),
  prevent = true,
) {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata(
      'bindEvent',
      { event, selector, prevent, propertyKey },
      Object.getPrototypeOf(target),
      propertyKey,
    );

    return descriptor;
  }
}
