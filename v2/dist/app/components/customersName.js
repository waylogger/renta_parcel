"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidateAndSave = void 0;
/**
 * @module customersName.ts
*/
var jquery_1 = __importDefault(require("jquery"));
var sharedActions_1 = require("../shared/sharedActions");
var shared = __importStar(require("../shared/sharedData"));
/**
 * @description смысл преобразований имени в том, что недопускаются небуквенные символы и не пробелы
 * кроме того допускается только 2 слова, первый символ каждого слова преобразуется в верхний регистр
*/
var nameValidateAndSave = function (state) {
    jquery_1.default("#" + shared.domElementId.custonersNameId).on('input', function () {
        var _a;
        var a = (_a = jquery_1.default("#" + shared.domElementId.custonersNameId).val()) === null || _a === void 0 ? void 0 : _a.toString().replace(/[^А-я|\s|A-z]/g, '');
        a = a.split(' ').slice(0, 2).map(function (str) {
            return "" + String(str.charAt(0)).toUpperCase() + str.slice(1, str.length);
        }).join(' ');
        jquery_1.default("#" + shared.domElementId.custonersNameId).val(a);
    });
    jquery_1.default("#" + shared.domElementId.custonersNameId).on('focusout', function () {
        var _a;
        state.saveCustomersName((_a = jquery_1.default("#" + shared.domElementId.custonersNameId).val()) === null || _a === void 0 ? void 0 : _a.toString());
        sharedActions_1.validateField(shared.domElementId.custonersNameId, shared.domElementId.customersNameTextId);
    });
};
exports.nameValidateAndSave = nameValidateAndSave;
