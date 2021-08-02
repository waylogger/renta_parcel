"use strict";
/**
 * @module customersPhone.ts
*/
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
exports.customersPhoneValidateAndSave = void 0;
var jquery_1 = __importDefault(require("jquery"));
var shared = __importStar(require("../shared/sharedData"));
/**
 * @description первый обязательный плюс и запрет на ввод других символов кроме чисел
*/
var customersPhoneValidateAndSave = function (state) {
    jquery_1.default("#" + shared.domElementId.customersPhoneId).on('focus', function () {
        var a = jquery_1.default("#" + shared.domElementId.customersPhoneId).val();
        if (a)
            jquery_1.default("#" + shared.domElementId.customersPhoneId).val(a);
        else
            jquery_1.default("#" + shared.domElementId.customersPhoneId).val('+7');
    });
    jquery_1.default("#" + shared.domElementId.customersPhoneId).on('input', function () {
        var _a;
        var a = '+' + ((_a = jquery_1.default("#" + shared.domElementId.customersPhoneId).val()) === null || _a === void 0 ? void 0 : _a.toString().replace(/[^\d]/g, ''));
        jquery_1.default("#" + shared.domElementId.customersPhoneId).val("" + a);
    });
    jquery_1.default("#" + shared.domElementId.customersPhoneId).on('focusout', function () {
        var _a;
        state.saveCustomersPhone((_a = jquery_1.default("#" + shared.domElementId.customersPhoneId).val()) === null || _a === void 0 ? void 0 : _a.toString());
    });
};
exports.customersPhoneValidateAndSave = customersPhoneValidateAndSave;
