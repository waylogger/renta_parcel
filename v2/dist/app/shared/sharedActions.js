"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextYearForServer = exports.currentYearForServer = exports.customDateForServer = exports.dateForServer = exports.translateDate = exports.formatCarModelFromHashToSelect = exports.formatCarModelFromSelectToHash = exports.formatCarModelFromBaseToSelect = exports.clearColor = exports.option = void 0;
/**
 * @module sharedActions.ts
 * @description некоторые переиспользуемые функции
*/
function option(text, id, className) {
    if (id === void 0) { id = ''; }
    if (className === void 0) { className = ''; }
    return "<option id=\"" + id + "\" class=\"" + className + "\">" + text + "</option>";
}
exports.option = option;
/**
 * @param model имя машины, которое получаем от сервера в формате: Toyota Rav4(бел.)
 * @returns то же имя, но без цвета в скобках
*/
function clearColor(model) {
    return model.replace(/\([^)]+\)/, '');
}
exports.clearColor = clearColor;
//--------------------------------------------------------------------------------------------------------
// форматирование имени авто из hash, от сервера и из select
function formatCarModelFromBaseToSelect(model) {
    return clearColor(model.trim().toLocaleLowerCase()).split(' ').map(function (item) { return "" + item.charAt(0).toUpperCase() + item.slice(1, item.length); }).join(' ').trim();
}
exports.formatCarModelFromBaseToSelect = formatCarModelFromBaseToSelect;
function formatCarModelFromSelectToHash(model) {
    return model.toLocaleLowerCase().replace(/\s/g, '_');
}
exports.formatCarModelFromSelectToHash = formatCarModelFromSelectToHash;
function formatCarModelFromHashToSelect(model) {
    return model.replace('_', ' ').split(' ').map(function (item) { return "" + item.charAt(0).toUpperCase() + item.slice(1, item.length); }).join(' ');
}
exports.formatCarModelFromHashToSelect = formatCarModelFromHashToSelect;
//--------------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Date} start
 * @param {Date} end
 * @returns {string} duration
 * @example ('01-01-2000 10:00', '02-01-2000 10:00') => (на 1 день с 01.01.2000 г. 10:00 по 02.02.2000 10:00)
 */
function translateDate(d1, d2, t1, t2) {
    var numOfDays = Math.floor(((d2.valueOf() - d1.valueOf()) / 1000 / (24 * 3600)) + 1);
    var numOfDaysStr = numOfDays.toString();
    var dayWord = '';
    var last2num = parseInt(numOfDaysStr, 10);
    if (last2num >= 10 && last2num <= 19) {
        dayWord = 'дней';
        return "\u043D\u0430 " + numOfDaysStr + " " + dayWord + " \u0441 " + d1.toLocaleDateString() + " " + t1 + " \u043F\u043E " + d2.toLocaleDateString() + " " + t2;
    }
    var lastNum = parseInt(numOfDaysStr.charAt(numOfDaysStr.length - 1), 10);
    if (lastNum === 1)
        dayWord = 'день';
    else if (lastNum === 0)
        dayWord = 'дней';
    else if (lastNum > 1 && lastNum < 5)
        dayWord = 'дня';
    else if (lastNum >= 5)
        dayWord = 'дней';
    return numOfDaysStr + " " + dayWord + " \u0441 " + d1.toLocaleDateString() + " " + t1 + " \u043F\u043E " + d2.toLocaleDateString() + " " + t2;
}
exports.translateDate = translateDate;
/**
 * @description получаем текущий date в формате для сервера: yyyy-mm-dd hh:mm:ssZ
*/
function dateForServer(customDate) {
    if (customDate === void 0) { customDate = new Date(); }
    return customDate.toLocaleDateString().split('.').reverse().join('-') + " " + customDate.toLocaleTimeString() + "Z";
}
exports.dateForServer = dateForServer;
function customDateForServer(customDate) {
    return customDate.toLocaleDateString().split('.').reverse().join('-') + " " + customDate.toLocaleTimeString() + "Z";
}
exports.customDateForServer = customDateForServer;
function currentYearForServer() {
    var dt = new Date();
    dt.setMonth(0);
    dt.setDate(1);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dateForServer(dt);
}
exports.currentYearForServer = currentYearForServer;
function nextYearForServer() {
    var dt = new Date();
    dt.setFullYear(dt.getFullYear() + 1);
    dt.setMonth(0);
    dt.setDate(1);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dateForServer(dt);
}
exports.nextYearForServer = nextYearForServer;
