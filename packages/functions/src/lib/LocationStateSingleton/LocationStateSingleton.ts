export class LocationStateSingleton {
  private value: Map<string, any> = new Map();
  private static instance: LocationStateSingleton;

  private constructor() {}

  public static getInstance(): LocationStateSingleton {
    if (!LocationStateSingleton.instance) {
      LocationStateSingleton.instance = new LocationStateSingleton();
    }

    return LocationStateSingleton.instance;
  }

  public popValue(key: string): any {
    const value = this.value.get(key);
    this.value.delete(key);
    return value;
  }

  public getValue(key: string): any {
    const value = this.value.get(key);
    return value;
  }

  public pushValue(key: string, value: any): void {
    this.value.set(key, value);
  }
}
