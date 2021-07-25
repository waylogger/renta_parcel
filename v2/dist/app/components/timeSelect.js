"use strict";
/**
 * @module timeSelect.ts
 * @description генерирует разметку для селекторов времени
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSelectorBy15Min = void 0;
var eachMinuteOfInterval_1 = __importDefault(require("date-fns/eachMinuteOfInterval"));
var sharedActions_1 = require("../shared/sharedActions");
var jquery_1 = __importDefault(require("jquery"));
function timeSelectorBy15Min(idModificator, domId) {
    var dateA = new Date(2021, 1, 1, 0, 0, 0);
    var dateB = new Date(2021, 1, 2, 0, 0, 0);
    var dateArr = eachMinuteOfInterval_1.default({ start: dateA, end: dateB }, { step: 15 });
    var shortTime = [];
    dateArr.forEach(function (dt) {
        shortTime.push(dt.toTimeString().slice(0, 5));
    });
    shortTime.splice(shortTime.length - 1); //убираем 00:00 в конце дня, так как это уже следующий день
    var resStr = '';
    shortTime.forEach(function (str) {
        resStr += sharedActions_1.option(str, str.replace(':', '-') + "-" + idModificator);
    });
    jquery_1.default("#" + domId).html(resStr);
    return resStr;
}
exports.timeSelectorBy15Min = timeSelectorBy15Min;
