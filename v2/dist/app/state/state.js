"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingState = exports.State = void 0;
/**
 * @module state.ts
*/
require("regenerator-runtime/runtime");
var querySender_1 = require("../CORS/querySender");
var sharedActions_1 = require("../shared/sharedActions");
var State = /** @class */ (function () {
    function State() {
        this.places = { result_code: 0, places: [] };
        this.cars = { result_code: 0, cars: [] };
        this.selectedCar = [];
        this.customersPhone = '';
        this.customersName = '';
    }
    State.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var places, cars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, querySender_1.getPlaceList()];
                    case 1:
                        places = _a.sent();
                        places.places.splice(0, 3);
                        this.places = places;
                        return [4 /*yield*/, querySender_1.getCarList()];
                    case 2:
                        cars = _a.sent();
                        this.cars = cars;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    State.prototype.getPlaces = function () {
        var places = this.places;
        return { result_code: places.result_code, places: places.places };
    };
    State.prototype.savePhone = function (num) {
        this.customersPhone = num;
    };
    State.prototype.getPhone = function () {
        return new String(this.customersPhone);
    };
    State.prototype.saveName = function (name) {
        this.customersName = name;
    };
    State.prototype.getName = function () {
        return new String(this.customersName);
    };
    State.prototype.getCars = function () {
        var res = this.cars;
        return { result_code: res.result_code, cars: res.cars };
    };
    State.prototype.selectCar = function (carStr) {
        var res = this.cars.cars.filter(function (car) {
            return sharedActions_1.formatCarModel(car.model).trim().replace(/\s/g, '_').toLowerCase() === carStr;
        });
        this.selectedCar = res;
    };
    State.prototype.getSelectedCars = function () {
        var a = __spreadArray([], this.selectedCar);
        return a;
    };
    return State;
}());
exports.State = State;
var BookingState = function () { return (new State()).init(); };
exports.BookingState = BookingState;