var Counter = /** @class */ (function () {
    function Counter() {
    }
    Counter.getNum = function () {
        return this._num++;
    };
    Counter._num = 0;
    return Counter;
}());
export default Counter;
