export default class Counter {
  private static _num = 0;
  static getNum(): number {
    return this._num++;
  }
}
