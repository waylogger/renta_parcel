"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingState = exports.State = void 0;
/**
 * @module state.ts
*/
require("regenerator-runtime/runtime");
var querySender_1 = require("../CORS/querySender");
var sharedActions_1 = require("../shared/sharedActions");
var shared = __importStar(require("../shared/sharedData"));
var eachMinuteOfInterval_1 = __importDefault(require("date-fns/eachMinuteOfInterval"));
var lodash_1 = require("lodash");
var jquery_1 = __importDefault(require("jquery"));
var date_fns_1 = require("date-fns");
var timeSelect_1 = require("../components/timeSelect");
var isWithinInterval_1 = __importDefault(require("date-fns/isWithinInterval"));
function trimPeriodBy3HoursOnEachSide(period) {
    var begin = new Date(period.begin);
    var end = new Date(period.end);
    end = date_fns_1.addMinutes(end, end.getTimezoneOffset());
    begin = date_fns_1.addMinutes(begin, begin.getTimezoneOffset());
    //периоды менее 7 часов не обрезаются
    if (end.valueOf() - begin.valueOf() < 1000 * 60 * 60 * 6)
        return period;
    end = date_fns_1.addHours(end, -3);
    begin = date_fns_1.addHours(begin, 3);
    return { begin: begin, end: end };
}
function trimMultiplePeriodsBy3HoursOnEachSide(periods) {
    return periods.map(function (el) { return trimPeriodBy3HoursOnEachSide(el); });
}
function isWithinIntervals(periods, timestamps) {
    var timeIsFound = true;
    var timeNotFound = false;
    for (var i = 0; i < timestamps.length; ++i) {
        var dt = timestamps[i];
        for (var j = 0; j < periods.length; ++j) {
            if (isWithinInterval_1.default(dt, {
                start: new Date(periods[j].begin),
                end: new Date(periods[j].end),
            })) {
                return timeIsFound;
            }
        }
    }
    return timeNotFound;
}
function isWithinIntervalsAndFindIt(periods, timestamps) {
    var timeIsFound = true;
    var timeNotFound = false;
    for (var i = 0; i < timestamps.length; ++i) {
        var dt = timestamps[i];
        for (var j = 0; j < periods.length; ++j) {
            if (isWithinInterval_1.default(dt, {
                start: new Date(periods[j].begin),
                end: new Date(periods[j].end),
            })) {
                return periods[j];
            }
        }
    }
    return;
}
var defultCarListResponse = { result_code: 0, cars: [] };
var defaultPlacesResponse = { result_code: 0, places: [] };
var State = /** @class */ (function () {
    function State() {
        //-----------------------------------------------------------------------------------------
        this.firstDateOfRange = undefined;
        //-----------------------------------------------------------------------------------------
        this.secondDateOfRange = undefined;
        /**
         * @description адреса места для выдачи и возврата арендованных авто
        */
        this.placesForReceiveAndReturnCars = { result_code: 0, places: [] };
        /**
         * @description все авто, доступные для бронирования у заказчика
        */
        this.allCarsForRent = defultCarListResponse;
        /**
         * @description все авто одной модели, которая бронируется в настоящее время
        */
        this.allCarsForCurrentBooking = [];
        /**
         * @description телефон арендатора
        */
        this.customersPhone = '';
        /**
         * @description телефон имя арендатора
        */
        this.customersName = '';
        /**
         * массив данных, который содержит данные о периодах брони в отношении allCarsForCurrentBooking
        */
        this.busyPeriodsForCurrentBookingCar = [];
        /**
         * @description массив данных, который содержит исходные значения периодов для текущих машин
        */
        this.freePeriodsForCurrentBookingCar = [];
        this.freePeriodsForCurrentBookingCarAfterFirstSelect = [];
        /**
         * @description массив данных, который содержит исходные значения периодов для всех машин
        */
        this.freePeriodsForAllBookingCar = [];
        /**
         * Массив дней, которые полностью недоступны для брони всех allCarsForCurrentBooking
        */
        this.fulldaysNotAvaivableForBooking = [];
        /**
         * Массив дней, которые частично недоступны для брони всех allCarsForCurrentBooking - ключи, значения - это массив недоступных отрезков по 15 мину
        */
        this.partedDayNotAvaiableForBooking = [];
    }
    State.prototype.isFirstDateOfRangeWasSelect = function () {
        return this.firstDateOfRange ? true : false;
    };
    State.prototype.getFirstDateOfRange = function () {
        if (this.firstDateOfRange)
            return new Date(this.firstDateOfRange);
        else
            return shared.badDateEqualNull;
    };
    State.prototype.setFirstDateOfRange = function (timestampOfFirstSelectDate) {
        var arrayForGenerateHTML = this.getFreeTimeSlotsForReceiveAndReturnCar(timestampOfFirstSelectDate);
        this.firstDateOfRange = timestampOfFirstSelectDate;
        timeSelect_1.timeSelectorBy15Min('receive', shared.domElementId.selectReceiveTimeId, arrayForGenerateHTML);
    };
    State.prototype.dropFirstDateOfRange = function () {
        jquery_1.default("#" + shared.domElementId.receiveDataId).val('');
        jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val('00:00');
        jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).attr('disabled', 'disabled');
        this.freePeriodsForCurrentBookingCarAfterFirstSelect = this.freePeriodsForCurrentBookingCar;
        this.firstDateOfRange = undefined;
    };
    State.prototype.isSecondDateOfRangeWasSelect = function () {
        return this.secondDateOfRange ? true : false;
    };
    State.prototype.setSecondDateOfRange = function (timestampOfSecondSelectDate) {
        var _a;
        this.secondDateOfRange = timestampOfSecondSelectDate;
        var selectedTime = (_a = jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val()) === null || _a === void 0 ? void 0 : _a.toString().split(':').map(function (it) { return parseInt(it, 10); });
        var firstDate = this.getFirstDateOfRange();
        var dt = new Date(firstDate);
        if (selectedTime && selectedTime[0])
            dt === null || dt === void 0 ? void 0 : dt.setHours(selectedTime[0]);
        if (selectedTime && selectedTime[1])
            dt === null || dt === void 0 ? void 0 : dt.setMinutes(selectedTime[1]);
        if (dt)
            this.filterCurrentCarForBookingBySelection(dt);
        var secondDate = this.getSecondDateOfRange();
        if (secondDate) {
            var arrayForGenerateHTML = this.getFreeTimeSlotsForReceiveAndReturnCar(secondDate);
            if (lodash_1.isEqual(firstDate, secondDate))
                for (var i = 0; i < arrayForGenerateHTML.length; ++i) {
                    var date = arrayForGenerateHTML[i];
                    var hour = date.getHours();
                    var min = date.getMinutes();
                    if (hour > (dt === null || dt === void 0 ? void 0 : dt.getHours())) {
                        continue;
                    }
                    else if (hour < dt.getHours()) {
                        arrayForGenerateHTML[i] = shared.badDateEqualNull;
                        continue;
                    }
                    else if (hour === dt.getHours()) {
                        if (min <= dt.getMinutes()) {
                            arrayForGenerateHTML[i] = shared.badDateEqualNull;
                            continue;
                        }
                    }
                }
            var firstDisableElement = arrayForGenerateHTML.indexOf(shared.badDateEqualNull);
            if (firstDisableElement >= 0) {
                // arrayForGenerateHTML.fill(shared.badDateEqualNull,firstDisableElement,arrayForGenerateHTML.length);
            }
            timeSelect_1.timeSelectorBy15Min('return', shared.domElementId.selectReturnTimeId, arrayForGenerateHTML);
            jquery_1.default("#" + shared.domElementId.selectReturnTimeId).attr('disabled', null);
        }
        // $(`#${shared.domElementId.selectReturnTimeId}`).attr('disabled', 'disabled');
    };
    State.prototype.dropSecondDateOfRange = function () {
        jquery_1.default("#" + shared.domElementId.returnDataId).val('');
        jquery_1.default("#" + shared.domElementId.selectReturnTimeId).val('00:00');
        jquery_1.default("#" + shared.domElementId.selectReturnTimeId).attr('disabled', 'disabled');
        this.secondDateOfRange = undefined;
    };
    State.prototype.getSecondDateOfRange = function () {
        if (this.secondDateOfRange)
            return new Date(this.secondDateOfRange);
        else
            return shared.badDateEqualNull;
    };
    State.prototype.filterCurrentCarForBookingBySelection = function (timestamp) {
        var splitDate = eachMinuteOfInterval_1.default({ start: timestamp, end: new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate() + 1) }, { step: 15 });
        this.freePeriodsForCurrentBookingCarAfterFirstSelect = this.freePeriodsForCurrentBookingCar.filter(function (carsWithPeriods) { return isWithinIntervals(carsWithPeriods.car_periods, splitDate); });
    };
    /**
     * @description сервер принимет дату в виде "2021-11-01 10:00Z", поэтому timestamp требуется постоянно переводить в этот формат, для чего служит эта функция
    */
    State.prototype.reformatDate = function (dt) {
        return dt.toLocaleDateString().split('.').reverse().join('-') + " " + dt.toLocaleTimeString() + "Z";
    };
    State.prototype.fetchFreePeriodsForAllCars = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carsIdOfAllCars, promisesForFetctFreePeriodsDate, beginDateForAllCars, endDateForAllCars, resultOfFetchFreePeriods;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        carsIdOfAllCars = [];
                        promisesForFetctFreePeriodsDate = [];
                        this.allCarsForRent.cars.forEach(function (car) { carsIdOfAllCars.push(car.car_id); });
                        beginDateForAllCars = sharedActions_1.currentYearForServer();
                        endDateForAllCars = sharedActions_1.nextYearForServer();
                        carsIdOfAllCars.forEach(function (id) {
                            var requestForFreePeriods = {
                                car_id: id,
                                begin: beginDateForAllCars,
                                end: endDateForAllCars,
                                include_idles: true,
                                include_reserves: true
                            };
                            promisesForFetctFreePeriodsDate.push(querySender_1.getCarPeriodList(requestForFreePeriods));
                        });
                        return [4 /*yield*/, Promise.all(promisesForFetctFreePeriodsDate)];
                    case 1:
                        resultOfFetchFreePeriods = _a.sent();
                        resultOfFetchFreePeriods.forEach(function (res, inx) {
                            _this.freePeriodsForAllBookingCar.push(__assign(__assign({}, _this.allCarsForRent.cars[inx]), { car_periods: trimMultiplePeriodsBy3HoursOnEachSide(res.car_periods) }));
                        });
                        this.freePeriodsForCurrentBookingCar = this.freePeriodsForAllBookingCar.filter(function (carPeriodItem) {
                            return _this.allCarsForCurrentBooking.find(function (item, inx) {
                                return item.car_id === carPeriodItem.car_id ? true : false;
                            });
                        });
                        this.freePeriodsForCurrentBookingCarAfterFirstSelect = this.freePeriodsForCurrentBookingCar;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description инициализация данных через асинхронные запросы
    */
    State.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, res, places;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        // --------------------------------------------------
                        promises.push(querySender_1.getPlaceList());
                        promises.push(querySender_1.getCarList());
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        res = _a.sent();
                        places = res[0];
                        places.places.splice(0, 3); //смысл убрать первые 3 элемента в том, что об этот попросил заказчик
                        this.placesForReceiveAndReturnCars = places;
                        //список машин
                        // --------------------------------------------------
                        this.allCarsForRent = res[1];
                        return [2 /*return*/, this];
                }
            });
        });
    };
    State.prototype.getPlacesForReceiveAndReturnCars = function () {
        var places = this.placesForReceiveAndReturnCars;
        return { result_code: places.result_code, places: places.places };
    };
    State.prototype.saveCustomersPhone = function (num) {
        this.customersPhone = num;
    };
    State.prototype.getCustomersPhone = function () {
        return new String(this.customersPhone).toString();
    };
    State.prototype.saveCustomersName = function (name) {
        this.customersName = name;
    };
    State.prototype.getCustomersName = function () {
        return new String(this.customersName).toString();
    };
    State.prototype.getAllCarsForRent = function () {
        var res = this.allCarsForRent;
        return { result_code: res.result_code, cars: res.cars };
    };
    State.prototype.selectCar = function (nameOfCarFromCarSelectOrHash) {
        return __awaiter(this, void 0, void 0, function () {
            var carModelNamesForCompare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!nameOfCarFromCarSelectOrHash)
                            return [2 /*return*/];
                        carModelNamesForCompare = [];
                        //step0 преобразуем имена для сравнения
                        this.getAllCarsForRent().cars.forEach(function (car) { carModelNamesForCompare.push(sharedActions_1.formatCarModelFromBaseToSelect(car.model)); });
                        //step1 фильтруем массив по совпадению с select
                        this.allCarsForCurrentBooking = this.allCarsForRent.cars.filter(function (_, inx) {
                            return carModelNamesForCompare[inx] === nameOfCarFromCarSelectOrHash;
                        });
                        return [4 /*yield*/, this.fetchFreePeriodsForAllCars()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.findFirstPeriodWhichConsistTimestamt = function (periods, timestamp) {
        var findedPeriod = periods.find(function (item) {
            return isWithinInterval_1.default(timestamp, { start: new Date(item.begin), end: new Date(item.end) });
        });
        return findedPeriod ? true : false;
    };
    State.prototype.isDateBusy = function (dt) {
        var _this = this;
        var splitDate = eachMinuteOfInterval_1.default({ start: dt, end: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1) }, { step: 15 });
        var fourHoursContinuesDurationFounded = false;
        var dateIsBusy = true;
        var dateIsFree = false;
        var numberTimeSlotsInFourHours = 1 * 4; //one
        if (this.isFirstDateOfRangeWasSelect()) {
            if (!this.firstDateOfRange)
                return false;
            if (this.firstDateOfRange)
                this.filterCurrentCarForBookingBySelection(this.firstDateOfRange);
            if (date_fns_1.isBefore(dt, this.firstDateOfRange))
                return true;
            var lastEndOfLatestInterval_1 = shared.badDateEqualNull;
            var findedPeriod = [];
            for (var i = 0; i < this.freePeriodsForCurrentBookingCarAfterFirstSelect.length; ++i) {
                var periods = this.freePeriodsForCurrentBookingCarAfterFirstSelect[i].car_periods;
                var finded = isWithinIntervalsAndFindIt(periods, sharedActions_1.splitDateByMinutes(this.firstDateOfRange, 15));
                if (finded)
                    findedPeriod.push(finded);
            }
            findedPeriod.forEach(function (period) {
                if (date_fns_1.isAfter(new Date(period.end), lastEndOfLatestInterval_1))
                    lastEndOfLatestInterval_1 = new Date(period.end);
            });
            if (date_fns_1.isAfter(dt, lastEndOfLatestInterval_1)) {
                return true;
            }
            return false;
        }
        this.freePeriodsForCurrentBookingCarAfterFirstSelect.forEach(function (item, inx) {
            var continuesDurationOfFreePeriods = 0;
            var slicePeriods = item.car_periods.filter(//оставляем только периоды, которые заканчиваются после начала сравнимого дня
            function (period) { return date_fns_1.isAfter(new Date(period.end), splitDate[0]); });
            slicePeriods = slicePeriods.filter(//оставляем только те периоды, которые начинаются в течении сравнимого дня
            function (period) { return date_fns_1.isBefore(new Date(period.begin), splitDate[splitDate.length - 1]); });
            for (var i = 0; i < splitDate.length; ++i) {
                var date = splitDate[i];
                if (continuesDurationOfFreePeriods >= numberTimeSlotsInFourHours) {
                    break;
                }
                if (_this.findFirstPeriodWhichConsistTimestamt(slicePeriods, date)) {
                    continuesDurationOfFreePeriods += 1;
                }
                else {
                    continuesDurationOfFreePeriods = 0;
                }
            }
            if (continuesDurationOfFreePeriods >= numberTimeSlotsInFourHours)
                fourHoursContinuesDurationFounded = true;
        });
        if (fourHoursContinuesDurationFounded)
            return dateIsFree;
        return dateIsBusy;
    };
    State.prototype.getFreeTimeSlotsForReceiveAndReturnCar = function (dt) {
        var splitDate = eachMinuteOfInterval_1.default({ start: dt, end: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1) }, { step: 15 });
        var fourHoursContinuesDurationFounded = false;
        var freeTimeSlotsForReceiveAndReturnCar = [];
        var numberTimeSlotsInFourHours = 1 * 4; //seven hours
        var continuesDurationOfFreePeriods = 0;
        for (var j = 0; j < this.freePeriodsForCurrentBookingCarAfterFirstSelect.length; ++j) {
            var slicePeriods = this.freePeriodsForCurrentBookingCarAfterFirstSelect[j].car_periods.filter(//оставляем только периоды, которые заканчиваются после начала сравнимого дня
            function (period) { return date_fns_1.isAfter(new Date(period.end), splitDate[0]); });
            slicePeriods = slicePeriods.filter(//оставляем только те периоды, которые начинаются в течении сравнимого дня
            function (period) { return date_fns_1.isBefore(new Date(period.begin), splitDate[splitDate.length - 1]); });
            for (var i = 0; i < splitDate.length; ++i) {
                var date = splitDate[i];
                if (this.findFirstPeriodWhichConsistTimestamt(slicePeriods, date)) {
                    freeTimeSlotsForReceiveAndReturnCar.push(date);
                    continuesDurationOfFreePeriods += 1;
                }
                else if (continuesDurationOfFreePeriods < numberTimeSlotsInFourHours) {
                    freeTimeSlotsForReceiveAndReturnCar = [];
                    continuesDurationOfFreePeriods = 0;
                }
            }
            if (continuesDurationOfFreePeriods >= numberTimeSlotsInFourHours)
                fourHoursContinuesDurationFounded = true;
        }
        if (fourHoursContinuesDurationFounded) {
            var filledArrayOfFreeTimeSlots = splitDate;
            for (var i = 0; i < filledArrayOfFreeTimeSlots.length; ++i) {
                var findItInFreeTimeSlotsArr = freeTimeSlotsForReceiveAndReturnCar.indexOf(filledArrayOfFreeTimeSlots[i]) >= 0 ? true : false;
                if (!findItInFreeTimeSlotsArr)
                    filledArrayOfFreeTimeSlots[i] = shared.badDateEqualNull;
            }
            return filledArrayOfFreeTimeSlots;
        }
        return [];
    };
    return State;
}());
exports.State = State;
var BookingState = function () { return (new State()).init(); };
exports.BookingState = BookingState;
