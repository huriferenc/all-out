import { v4 as uuid } from 'uuid';

export abstract class Helper {
  public static randomNumber(min?: number, max?: number): number {
    if (Number.isSafeInteger(min) && Number.isSafeInteger(max)) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }

    return new Date().valueOf();
  }

  public static uniqueId(): string {
    return uuid();
  }
}
