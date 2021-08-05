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
exports.carSelect = void 0;
var jquery_1 = __importDefault(require("jquery"));
var sharedActions_1 = require("../shared/sharedActions");
var shared = __importStar(require("../shared/sharedData"));
var lodash_1 = __importDefault(require("lodash"));
var CalendarEnjection_1 = require("./CalendarEnjection");
var carSelect = function (state) { return __awaiter(void 0, void 0, void 0, function () {
    var addr, modelName, resStr, cars, modelArr, selArray;
    return __generator(this, function (_a) {
        addr = location.pathname;
        modelName = addr.replace(/.*\//g, '');
        resStr = '';
        cars = state.getAllCarsForRent().cars;
        modelArr = [];
        cars.forEach(function (car) {
            var c = sharedActions_1.formatCarModelFromBaseToSelect(car.model);
            modelArr.push(c.trim());
        });
        selArray = lodash_1.default.uniq(modelArr).map(function (item, inx) {
            var carName = '';
            if (item.match(/Mkpp/))
                carName = item.replace('Mkpp', "МКПП");
            else if (item.match(/Akpp/))
                carName = item.replace('Akpp', "АКПП");
            else
                carName = item;
            modelName = modelName.replace('mkpp', 'МКПП');
            modelName = modelName.replace('akpp', 'АКПП');
            return modelName ?
                sharedActions_1.option(carName, carName.toLowerCase().replace(/\s/g, '_'), '', false, sharedActions_1.formatCarModelFromHashToSelect(modelName))
                : sharedActions_1.option(carName, carName.toLowerCase().replace(/\s/g, '_'));
        });
        resStr += selArray.join('\n');
        jquery_1.default("#" + shared.domElementId.carSelectId).html(resStr);
        if (modelName)
            jquery_1.default("#" + shared.domElementId.carSelectId).attr('disabled', 'disabled');
        jquery_1.default("#" + shared.domElementId.carSelectId).on('change', function () { return __awaiter(void 0, void 0, void 0, function () {
            var stringValueFromSelect;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stringValueFromSelect = (_a = jquery_1.default("#" + shared.domElementId.carSelectId).val()) === null || _a === void 0 ? void 0 : _a.toString();
                        stringValueFromSelect = stringValueFromSelect === null || stringValueFromSelect === void 0 ? void 0 : stringValueFromSelect.replace('МКПП', 'Mkpp');
                        stringValueFromSelect = stringValueFromSelect === null || stringValueFromSelect === void 0 ? void 0 : stringValueFromSelect.replace('АКПП', 'Akpp');
                        jquery_1.default("#" + shared.domElementId.bookModuleId).removeClass('carNotSelect');
                        if (state.isFirstDateOfRangeWasSelect())
                            state.dropFirstDateOfRange();
                        if (state.isSecondDateOfRangeWasSelect())
                            state.dropSecondDateOfRange();
                        return [4 /*yield*/, state.selectCar(stringValueFromSelect)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, CalendarEnjection_1.CalendarEnjector(state)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        jquery_1.default("#" + shared.domElementId.carSelectId).trigger('change');
        return [2 /*return*/];
    });
}); };
exports.carSelect = carSelect;
/**
 * @module carSelect.ts

import $ from 'jquery';
import { State } from '../state/state';
import { option, clearColor, formatCarModelFromBaseToSelect, formatCarModelFromSelectToHash, formatCarModelFromHashToSelect} from '../shared/sharedActions';
import * as shared from '../shared/sharedData';
import _, { Primitive } from 'lodash';
import {DateRangePicker} from '../components/Calendar'
import { CalendarEnjector } from './CalendarEnjection';
import { SingleCar } from '../CORS/entities/apiExchange/serverTypes';



export const carSelect = async (state: State): Promise<string> => {
    let resStr = '';
    const cars = state.getAllCarsForRent().cars;

    const modelArr: string[] = [];

    cars.forEach(
        (car) => {
            const c = formatCarModelFromBaseToSelect(car.model);
            modelArr.push(
                c.trim()
            );
        }
    );

    let hashCar: string = location.hash;
    hashCar = hashCar.replace('#','');
    const hashInx = modelArr.findIndex( (el)=> el===formatCarModelFromHashToSelect(hashCar) );
    const tempCar: string = modelArr[0];
    modelArr[0] = modelArr[hashInx];
    modelArr[hashInx] = tempCar;


    const selArray: string[] = _.uniq(modelArr).map(
        (item, inx) => {
            return option(item, item.toLowerCase().replace(/\s/g,'_'));
        }
    );
    resStr += selArray.join('\n');


    $(`#${shared.domElementId.carSelectId}`).html(resStr);
    $(`#${shared.domElementId.carSelectId}`).on('change', async () => {

        const stringValueFromSelect =  $(`#${shared.domElementId.carSelectId}`).val()?.toString();
        if (!stringValueFromSelect)
            throw new Error('CarSelectCallback::cant take car value');
        const car = formatCarModelFromSelectToHash(stringValueFromSelect);



        location.hash = `#${car}`
        $(`#${shared.domElementId.bookModuleId}`).removeClass('carNotSelect');
        if (state.isFirstDateOfRangeWasSelect())
        state.dropFirstDateOfRange();

        if (state.isSecondDateOfRangeWasSelect())
        state.dropSecondDateOfRange();

        await state.selectCar(stringValueFromSelect);
        await CalendarEnjector(state);


    })
    $(`#${shared.domElementId.carSelectId}`).trigger('change');

    return resStr;
}
*/
