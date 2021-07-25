"use strict";
/**
 * @module placeSelect.ts
 * @description генерирует разметку для выбора места получения и возврата авто
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
exports.selectPlace = exports.placeOptions = void 0;
var sharedActions_1 = require("../shared/sharedActions");
var shared = __importStar(require("../shared/sharedData"));
var jquery_1 = __importDefault(require("jquery"));
function placeOptions(state) {
    var resStr = '';
    state.getPlaces().places.forEach(function (place) { return resStr += sharedActions_1.option(place.title + " + " + place.delivery_cost + " \u20BD"); });
    jquery_1.default("#" + shared.domElementId.returnPlaceSelectId).html(resStr);
    jquery_1.default("#" + shared.domElementId.receivePlaceSelectId).html(resStr);
    return resStr;
}
exports.placeOptions = placeOptions;
var selectPlace = function (state) {
    jquery_1.default("#" + shared.domElementId.receivePlaceSelectId).on('change', function () {
        var _a;
        var txt = (_a = jquery_1.default("#" + shared.domElementId.receivePlaceSelectId).val()) === null || _a === void 0 ? void 0 : _a.toString().trim().split(' + ')[0];
        if (txt === state.getPlaces().places[4].title) {
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceInputId).removeClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).removeClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).removeClass('customPlace-wrap-start');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).addClass('customPlace-visible');
        }
        else {
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceInputId).addClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).addClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).addClass('customPlace-wrap-start');
            jquery_1.default("#" + shared.domElementId.receiveCustomPlaceId).removeClass('customPlace-visible');
        }
    });
    jquery_1.default("#" + shared.domElementId.returnPlaceSelectId).on('change', function () {
        var _a;
        var txt = (_a = jquery_1.default("#" + shared.domElementId.returnPlaceSelectId).val()) === null || _a === void 0 ? void 0 : _a.toString().trim().split(' + ')[0];
        if (txt === state.getPlaces().places[4].title) {
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceInputId).removeClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).removeClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).removeClass('customPlace-wrap-end');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).addClass('customPlace-visible');
        }
        else {
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceInputId).addClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).addClass('customPlace-hidden');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).addClass('customPlace-wrap-end');
            jquery_1.default("#" + shared.domElementId.returnCustomPlaceId).removeClass('customPlace-visible');
        }
    });
};
exports.selectPlace = selectPlace;