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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingState = exports.State = void 0;
/**
 * @module state.ts
*/
require("regenerator-runtime/runtime");
var querySender_1 = require("../CORS/querySender");
var sharedActions_1 = require("../shared/sharedActions");
var defultCarListResponse = { result_code: 0, cars: [] };
var defaultPlacesResponse = { result_code: 0, places: [] };
// const convertFreePeriodsToBusyPeriods = function (singleCarWithFreePeriods: SingleCarWithPeriods): SingleCarWithPeriods {
// 	console.log(Object.values(singleCarWithFreePeriods.car_periods));
// }
var State = /** @class */ (function () {
    function State() {
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
                            _this.freePeriodsForAllBookingCar.push(__assign(__assign({}, _this.allCarsForRent.cars[inx]), { car_periods: res.car_periods }));
                        });
                        this.freePeriodsForCurrentBookingCar = this.freePeriodsForAllBookingCar.filter(function (carPeriodItem) {
                            return _this.allCarsForCurrentBooking.find(function (item, inx) { return item.car_id === carPeriodItem.car_id; }) ? true : false;
                        });
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
            var places, _a, carNameFromHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, querySender_1.getPlaceList()];
                    case 1:
                        places = _b.sent();
                        places.places.splice(0, 3); //смысл убрать первые 3 элемента в том, что об этот попросил заказчик
                        this.placesForReceiveAndReturnCars = places;
                        //список машин
                        // --------------------------------------------------
                        _a = this;
                        return [4 /*yield*/, querySender_1.getCarList()];
                    case 2:
                        //список машин
                        // --------------------------------------------------
                        _a.allCarsForRent = _b.sent();
                        carNameFromHash = location.hash.replace('#', '');
                        this.selectCar(sharedActions_1.formatCarModelFromHashToSelect(carNameFromHash));
                        //периоды свободы и занятости авто
                        return [4 /*yield*/, this.fetchFreePeriodsForAllCars()];
                    case 3:
                        //периоды свободы и занятости авто
                        _b.sent();
                        // convertFreePeriodsToBusyPeriods
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
                if (!nameOfCarFromCarSelectOrHash)
                    throw new Error('State::selectCar: badArg');
                carModelNamesForCompare = [];
                //step0 преобразуем имена для сравнения
                this.getAllCarsForRent().cars.forEach(function (car) { carModelNamesForCompare.push(sharedActions_1.formatCarModelFromBaseToSelect(car.model)); });
                //step1 фильтруем массив по совпадению с select
                this.allCarsForCurrentBooking = this.allCarsForRent.cars.filter(function (_, inx) {
                    return carModelNamesForCompare[inx] === nameOfCarFromCarSelectOrHash;
                });
                return [2 /*return*/];
            });
        });
    };
    State.prototype.isDateBusy = function (dt) {
        // if ( isPast(dt) ) return true;
        // if (this.fullbusyDates.find(
        // 	(d) => isSameDay(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0), d))) {
        // 	return true;
        // }
        // return false;
        return false;
    };
    return State;
}());
exports.State = State;
var BookingState = function () { return (new State()).init(); };
exports.BookingState = BookingState;
