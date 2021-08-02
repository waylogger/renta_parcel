"use strict";
/**
 * @module bitText.ts
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
exports.onPreview = exports.bidPreview = void 0;
var jquery_1 = __importDefault(require("jquery"));
var shared = __importStar(require("../shared/sharedData"));
var sharedActions_1 = require("../shared/sharedActions");
var querySender_1 = require("../CORS/querySender");
function bidPreview(state) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var resStr, carModel, leftDate, leftTime, leftPlace, rightDate, rightTime, rightPlace, d1, d2, placeBegin, placeEnd, bidRequest, bidCost, cost, deposit, deliveryCost;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    resStr = '';
                    carModel = (_a = jquery_1.default("#" + shared.domElementId.carSelectId).val()) === null || _a === void 0 ? void 0 : _a.toString();
                    leftDate = (_b = jquery_1.default("#" + shared.domElementId.receiveDataId).val()) === null || _b === void 0 ? void 0 : _b.toString();
                    leftTime = (_c = jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val()) === null || _c === void 0 ? void 0 : _c.toString();
                    leftPlace = (_d = jquery_1.default("#" + shared.domElementId.receivePlaceSelectId).val()) === null || _d === void 0 ? void 0 : _d.toString();
                    rightDate = (_e = jquery_1.default("#" + shared.domElementId.returnDataId).val()) === null || _e === void 0 ? void 0 : _e.toString();
                    rightTime = (_f = jquery_1.default("#" + shared.domElementId.selectReturnTimeId).val()) === null || _f === void 0 ? void 0 : _f.toString();
                    rightPlace = (_g = jquery_1.default("#" + shared.domElementId.returnPlaceSelectId).val()) === null || _g === void 0 ? void 0 : _g.toString();
                    if (carModel) {
                        resStr += "<span id=\"" + shared.domElementId.carNameId + "\">\u0410\u0440\u0435\u043D\u0434\u0430: " + carModel + "</span>";
                    }
                    if (!(leftDate && leftTime && rightTime && rightDate)) return [3 /*break*/, 2];
                    d1 = leftDate.split('.').reverse().join('-') + " " + leftTime + "Z";
                    d2 = rightDate.split('.').reverse().join('-') + " " + rightTime + "Z";
                    placeBegin = state.getPlacesForReceiveAndReturnCars().places.filter(function (a) { return a.title === (leftPlace === null || leftPlace === void 0 ? void 0 : leftPlace.split(' + ')[0]); })[0];
                    placeEnd = state.getPlacesForReceiveAndReturnCars().places.filter(function (a) { return a.title === (rightPlace === null || rightPlace === void 0 ? void 0 : rightPlace.split(' + ')[0]); })[0];
                    resStr += "<span id=\"" + shared.domElementId.periodRentId + "\"> \u043D\u0430 " + sharedActions_1.translateDate(new Date(d1), new Date(d2), leftTime, rightTime) + "</span>";
                    bidRequest = {
                        car_id: state.carIdForBidCost(),
                        begin: d1,
                        end: d2,
                        begin_place_id: placeBegin.place_id,
                        end_place_id: placeEnd.place_id,
                        services: [],
                    };
                    return [4 /*yield*/, querySender_1.getCost(bidRequest)];
                case 1:
                    bidCost = _h.sent();
                    cost = bidCost.cost;
                    deposit = bidCost.deposit;
                    deliveryCost = placeEnd.delivery_cost + placeBegin.delivery_cost;
                    if (!cost || !deposit) {
                    }
                    else {
                        if (deliveryCost > 0)
                            resStr += "<span id=\"" + shared.domElementId.bidCostId + "\"> c\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0440\u0435\u043D\u0434\u044B " + (cost - deliveryCost) + " \u20BD + \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0430\u0432\u0442\u043E " + deliveryCost + " \u20BD";
                        else
                            resStr += "<span id=\"" + shared.domElementId.bidCostId + "\"> c\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0440\u0435\u043D\u0434\u044B " + cost + " \u20BD";
                        resStr += " + \u0437\u0430\u043B\u043E\u0433 " + deposit + " \u20BD (\u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u043F\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044E \u0430\u0440\u0435\u043D\u0434\u044B).</span><br>";
                        resStr += "<span id=\"" + shared.domElementId.costResolutionId + "\">\u0418\u0442\u043E\u0433\u043E: " + (cost + deposit) + " \u20BD</span>";
                    }
                    _h.label = 2;
                case 2:
                    jquery_1.default("#" + shared.domElementId.bidTextId).html(resStr);
                    return [2 /*return*/];
            }
        });
    });
}
exports.bidPreview = bidPreview;
function onPreview(state) {
    var onChangeList = [
        "" + shared.domElementId.carSelectId,
        "" + shared.domElementId.selectReceiveTimeId,
        "" + shared.domElementId.selectReturnTimeId,
        "" + shared.domElementId.receivePlaceSelectId,
        "" + shared.domElementId.returnPlaceSelectId,
    ];
    var onFocusList = [
        "" + shared.domElementId.receiveDataId,
        "" + shared.domElementId.returnDataId,
    ];
    onChangeList.forEach(function (id) {
        jquery_1.default("#" + id).on('change', function () {
            bidPreview(state);
        });
    });
    onFocusList.forEach(function (id) {
        jquery_1.default("#" + id).on('change', function () {
            bidPreview(state);
        });
    });
}
exports.onPreview = onPreview;
/**
 * 	<span id="carName"></span>
    <span id="periodRent"></span>
    <br>
    <span id="bidCost"></span>
    <span id="deposit"></span>
    <br>
    <span id="resolution"></span>
*/
