"use strict";
/**
 * @module carSelect.ts
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
exports.carSelect = void 0;
var jquery_1 = __importDefault(require("jquery"));
var sharedActions_1 = require("../shared/sharedActions");
var shared = __importStar(require("../shared/sharedData"));
var lodash_1 = __importDefault(require("lodash"));
var carSelect = function (state) {
    var resStr = '';
    var cars = state.getCars().cars;
    var modelArr = [];
    cars.forEach(function (car) {
        var c = sharedActions_1.formatCarModel(car.model);
        modelArr.push(c.trim());
    });
    resStr += lodash_1.default.uniq(modelArr).map(function (item) {
        return sharedActions_1.option(item, item.toLowerCase().replace(' ', '_'));
    }).join('\n');
    jquery_1.default("#" + shared.domElementId.carSelectId).html(resStr);
    jquery_1.default("#" + shared.domElementId.carSelectId).on('change', function () {
        var _a;
        var car = (_a = jquery_1.default("#" + shared.domElementId.carSelectId).val()) === null || _a === void 0 ? void 0 : _a.toString().toLocaleLowerCase().replace(/\s/g, '_');
        location.href = "/#" + car;
        jquery_1.default("#" + shared.domElementId.bookModuleId).removeClass('carNotSelect');
    });
    jquery_1.default("#" + shared.domElementId.carSelectId).trigger('change');
    state.selectCar(location.hash.slice(1, location.hash.length));
    return resStr;
};
exports.carSelect = carSelect;
