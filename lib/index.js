import { MessageType, NotePosition } from "./definition";
import Actor from "./actor";
var dump = function () {
    var actors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actors[_i] = arguments[_i];
    }
    if (actors.length === 0)
        return "";
    var str = restructure(actors);
    var res = 'sequenceDiagram';
    return res + '\n' + indent(str);
};
var restructure = function (actors) {
    var all = actors.map(function (actor) { return actor.records; }).flat();
    var res = "";
    var participants = all
        .filter(function (r) { return r.type === "participant"; })
        .map(function (r) { return r.action; })
        .reduce(function (prev, current) { return prev + "\n" + current + "\n\n"; });
    var actions = all
        .filter(function (r) { return r.type !== "participant"; })
        .sort(function (a, b) { return a.seq - b.seq; })
        .map(function (r) { return r.action; })
        .reduce(function (prev, current) { return prev + "\n" + current; });
    res += participants;
    res += actions;
    return res;
};
var indent = function (text) {
    return text.split('\n').map(function (s) { return '\t' + s; }).reduce(function (prev, current) { return prev + '\n' + current; });
};
export { Actor, MessageType, NotePosition, dump };
