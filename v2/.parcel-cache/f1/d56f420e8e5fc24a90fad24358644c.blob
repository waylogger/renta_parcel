"use strict";
/**
 * @module timeSelect.ts
 * @description генерирует разметку для селекторов времени
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
exports.timeSelectorBy15Min = exports.correctionSecondTimeAfterFirst = void 0;
var eachMinuteOfInterval_1 = __importDefault(require("date-fns/eachMinuteOfInterval"));
var sharedActions_1 = require("../shared/sharedActions");
var jquery_1 = __importDefault(require("jquery"));
var sharedData_1 = require("../shared/sharedData");
var date_fns_1 = require("date-fns");
var shared = __importStar(require("../shared/sharedData"));
function correctionSecondTimeAfterFirst(state) {
    var _a;
    var selectedTime = (_a = jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val()) === null || _a === void 0 ? void 0 : _a.toString().split(':').map(function (it) { return parseInt(it, 10); });
    var firstDate = state.getFirstDateOfRange();
    if (!firstDate)
        return;
    var dt = new Date(firstDate);
    if (selectedTime && selectedTime[0])
        dt === null || dt === void 0 ? void 0 : dt.setHours(selectedTime[0]);
    if (selectedTime && selectedTime[1])
        dt === null || dt === void 0 ? void 0 : dt.setMinutes(selectedTime[1]);
    if (dt)
        state.filterCurrentCarForBookingBySelection(dt);
    var secondDate = state.getSecondDateOfRange();
    if (secondDate) {
        var arrayForGenerateHTML = state.getFreeTimeSlotsForReceiveAndReturnCar(secondDate);
        if (date_fns_1.isEqual(firstDate, secondDate))
            for (var i = 0; i < arrayForGenerateHTML.length; ++i) {
                var date = arrayForGenerateHTML[i];
                var hour = date.getHours();
                var min = date.getMinutes();
                if (hour > (dt === null || dt === void 0 ? void 0 : dt.getHours())) {
                    continue;
                }
                else if (hour < dt.getHours()) {
                    arrayForGenerateHTML[i] = sharedData_1.badDateEqualNull;
                    continue;
                }
                else if (hour === dt.getHours()) {
                    if (min <= dt.getMinutes()) {
                        arrayForGenerateHTML[i] = sharedData_1.badDateEqualNull;
                        continue;
                    }
                }
            }
        timeSelectorBy15Min('return', shared.domElementId.selectReturnTimeId, arrayForGenerateHTML);
        jquery_1.default("#" + shared.domElementId.selectReturnTimeId).attr('disabled', null);
    }
}
exports.correctionSecondTimeAfterFirst = correctionSecondTimeAfterFirst;
function timeSelectorBy15Min(idModificator, domId, arrayForGenerateHTML) {
    var dateA = new Date(2021, 1, 1, 0, 0, 0);
    var dateB = new Date(2021, 1, 2, 0, 0, 0);
    var dateArr = eachMinuteOfInterval_1.default({ start: dateA, end: dateB }, { step: 15 });
    var shortTime = [];
    dateArr.forEach(function (dt) {
        shortTime.push(dt.toTimeString().slice(0, 5));
    });
    shortTime.splice(shortTime.length - 1); //убираем 00:00 в конце дня, так как это уже следующий день
    var resStr = '';
    var isDisabled = true;
    shortTime.forEach(function (str, inx) {
        date_fns_1.isEqual(arrayForGenerateHTML[inx], sharedData_1.badDateEqualNull) ? resStr += sharedActions_1.option(str, str.replace(':', '-') + "-" + idModificator, '', isDisabled) :
            resStr += sharedActions_1.option(str, str.replace(':', '-') + "-" + idModificator);
    });
    jquery_1.default("#" + domId).html(resStr);
    return resStr;
}
exports.timeSelectorBy15Min = timeSelectorBy15Min;
