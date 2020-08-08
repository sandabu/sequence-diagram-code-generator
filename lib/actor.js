import { MessageType } from "./definition";
import Counter from "./counter";
var Actor = /** @class */ (function () {
    function Actor(name) {
        this.name = name;
        this.records = [];
        this._flush();
        this._set("participant", "participant " + name);
    }
    Actor.prototype.sendMessage = function (text, to, type) {
        var name = typeof to === "string" ? to : to.name;
        this._set(type, "" + this.name + this._getAllow(type) + name + ": " + text);
    };
    Actor.prototype.writeNote = function (text, position) {
        var leftText = "Note " + position + " of " + this.name + ": " + text;
        this._set("Note", leftText);
    };
    Actor.prototype.writeNoteOver = function (text, actor) {
        var leftText = "Note over " + this.name + "," + actor.name + ": " + text;
        this._set("Note", leftText);
    };
    Actor.prototype.activate = function () {
        this._set("activate", "activate " + this.name);
    };
    Actor.prototype.deactivate = function () {
        this._set("deactivate", "deactivate " + this.name);
    };
    Actor.prototype._set = function (type, v) {
        var d = {
            type: type,
            action: v,
            seq: Counter.getNum(),
            timestamp: new Date().getTime(),
        };
        this.records.push(d);
    };
    Actor.prototype._getAllow = function (type) {
        switch (type) {
            case MessageType.SYNC:
                return "->>";
            case MessageType.REPLY:
                return "-->>";
            default:
                throw new Error("No such message type");
        }
    };
    Actor.prototype._flush = function () {
        // sessionStorage.removeItem(sesstionKey);
    };
    return Actor;
}());
export default Actor;
