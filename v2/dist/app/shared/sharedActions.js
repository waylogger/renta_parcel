"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = void 0;
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
