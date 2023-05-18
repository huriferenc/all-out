const STORE_PREFIX = 'ALL-OUT-GRPH';

export class LocalStorage {
  constructor() {}

  static setItem(key: string, value: any): void {
    localStorage.setItem(`${STORE_PREFIX}-${key}`, JSON.stringify(value));
  }

  static getItem(key: string): any {
    return JSON.parse(localStorage.getItem(`${STORE_PREFIX}-${key}`));
  }

  static removeItem(key: string): void {
    localStorage.removeItem(`${STORE_PREFIX}-${key}`);
  }

  static clearAll(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.indexOf(STORE_PREFIX) !== -1) {
        localStorage.removeItem(key);
      }
    }
  }
}
