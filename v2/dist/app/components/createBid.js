"use strict";
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
exports.createBid = void 0;
var shared = __importStar(require("../shared/sharedData"));
var jquery_1 = __importDefault(require("jquery"));
var querySender_1 = require("../CORS/querySender");
function createBid(state) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function () {
        var resStr, leftDate, leftTime, leftPlace, rightDate, rightTime, rightPlace, fio, phone, ageAgree, policyAgree, placeBegin, placeEnd, otherReceivePlace, otherReturnPlace, fileArr, d1, d2, bidRequest, form_1, keys, vals_1, bid;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    resStr = '';
                    leftDate = (_a = jquery_1.default("#" + shared.domElementId.receiveDataId).val()) === null || _a === void 0 ? void 0 : _a.toString();
                    leftTime = (_b = jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val()) === null || _b === void 0 ? void 0 : _b.toString();
                    leftPlace = (_c = jquery_1.default("#" + shared.domElementId.receivePlaceSelectId).val()) === null || _c === void 0 ? void 0 : _c.toString();
                    rightDate = (_d = jquery_1.default("#" + shared.domElementId.returnDataId).val()) === null || _d === void 0 ? void 0 : _d.toString();
                    rightTime = (_e = jquery_1.default("#" + shared.domElementId.selectReturnTimeId).val()) === null || _e === void 0 ? void 0 : _e.toString();
                    rightPlace = (_f = jquery_1.default("#" + shared.domElementId.returnPlaceSelectId).val()) === null || _f === void 0 ? void 0 : _f.toString();
                    fio = (_g = jquery_1.default("#" + shared.domElementId.custonersNameId).val()) === null || _g === void 0 ? void 0 : _g.toString();
                    phone = (_h = jquery_1.default("#" + shared.domElementId.customersPhoneId).val()) === null || _h === void 0 ? void 0 : _h.toString();
                    ageAgree = jquery_1.default("#" + shared.domElementId.ageAgree).is(':checked');
                    policyAgree = jquery_1.default("#" + shared.domElementId.policyAgree).is(':checked');
                    placeBegin = state.getPlacesForReceiveAndReturnCars().places.filter(function (a) { return a.title === (leftPlace === null || leftPlace === void 0 ? void 0 : leftPlace.split(' + ')[0]); })[0];
                    placeEnd = state.getPlacesForReceiveAndReturnCars().places.filter(function (a) { return a.title === (rightPlace === null || rightPlace === void 0 ? void 0 : rightPlace.split(' + ')[0]); })[0];
                    otherReceivePlace = (_j = jquery_1.default("#" + shared.domElementId.receiveCustomPlaceInputId).val()) === null || _j === void 0 ? void 0 : _j.toString();
                    otherReturnPlace = (_k = jquery_1.default("#" + shared.domElementId.returnCustomPlaceInputId).val()) === null || _k === void 0 ? void 0 : _k.toString();
                    if (!(leftDate && leftTime && rightTime && rightDate && fio && phone && policyAgree && ageAgree && placeBegin && placeEnd)) return [3 /*break*/, 2];
                    fileArr = '';
                    if (placeBegin.place_id === 179 && otherReceivePlace === '' || placeEnd.place_id === 179 && otherReturnPlace === '')
                        return [2 /*return*/];
                    else if (placeBegin.place_id === 179 && otherReceivePlace != '' && placeEnd.place_id === 179 && otherReturnPlace != '') {
                        if (otherReturnPlace && otherReceivePlace)
                            fileArr = new File([otherReceivePlace, otherReturnPlace], 'получение-возврат');
                    }
                    d1 = leftDate.split('.').reverse().join('-') + " " + leftTime + "Z";
                    d2 = rightDate.split('.').reverse().join('-') + " " + rightTime + "Z";
                    bidRequest = {
                        car_id: state.getMainCar(),
                        begin: d1,
                        end: d2,
                        fio: fio,
                        phone: phone,
                        begin_place_id: placeBegin.place_id,
                        end_place_id: placeEnd.place_id,
                        file: fileArr,
                    };
                    form_1 = new FormData();
                    keys = Object.keys(bidRequest);
                    vals_1 = Object.values(bidRequest);
                    keys.forEach(function (key, inx) {
                        form_1.append(key, vals_1[inx]);
                    });
                    return [4 /*yield*/, querySender_1.sendRequest(form_1)];
                case 1:
                    bid = _l.sent();
                    if (bid.error_message == null) {
                        jquery_1.default("#" + shared.domElementId.formInputId).html('');
                        jquery_1.default("#" + shared.domElementId.bookSelectDivId).html('');
                        jquery_1.default("#" + shared.domElementId.bidTextId).addClass(shared.domElementId.bigBidTextClass);
                        return [2 /*return*/];
                    }
                    _l.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.createBid = createBid;
