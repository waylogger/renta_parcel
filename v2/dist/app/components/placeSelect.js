"use strict";
/**
 * @module placeSelect.ts
 * @description генерирует разметку для выбора места получения и возврата авто
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOptions = void 0;
var sharedActions_1 = require("../shared/sharedActions");
function placeOptions(places) {
    var resStr = '';
    places.places.forEach(function (place) { return resStr += sharedActions_1.option(place.title + " + " + place.delivery_cost + " \u20BD"); });
    return resStr;
}
exports.placeOptions = placeOptions;
