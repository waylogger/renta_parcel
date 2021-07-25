"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCarModel = exports.clearColor = exports.option = void 0;
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
function formatCarModel(model) {
    return clearColor(model.trim().toLocaleLowerCase()).split(' ').map(function (item) { return "" + item.charAt(0).toUpperCase() + item.slice(1, item.length); }).join(' ');
}
exports.formatCarModel = formatCarModel;
