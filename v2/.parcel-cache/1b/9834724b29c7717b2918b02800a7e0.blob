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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = exports.getCarPeriodList = exports.getCost = exports.getPlaceList = exports.getCarList = exports.getRequestBuilder = void 0;
require("regenerator-runtime/runtime");
var auth_1 = require("./auth");
var query_string_1 = __importDefault(require("query-string"));
var jquery_1 = __importDefault(require("jquery"));
function getRequestBuilder(urlSuffix, query) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '';
                    query ? url = auth_1.server + ":" + auth_1.port + "/" + auth_1.dataApiEndpoint + "/" + urlSuffix + "?" + query
                        :
                            url = auth_1.server + ":" + auth_1.port + "/" + auth_1.dataApiEndpoint + "/" + urlSuffix;
                    return [4 /*yield*/, auth_1.getAccess()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer " + token
                            },
                        })];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.getRequestBuilder = getRequestBuilder;
function getCarList() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestBuilder('car_list', '')];
                case 1:
                    res = _a.sent();
                    if (res.result_code != 0)
                        jquery_1.default(location).attr('href', '/');
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getCarList = getCarList;
function getPlaceList() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestBuilder('place_list', '')];
                case 1:
                    res = (_a.sent());
                    if (res.result_code != 0)
                        jquery_1.default(location).attr('href', '/');
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getPlaceList = getPlaceList;
function getCost(reqObj) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestBuilder('bid_cost', query_string_1.default.stringify(reqObj, { arrayFormat: 'bracket' }))];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.getCost = getCost;
function getCarPeriodList(reqObj) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestBuilder('car_period_list', query_string_1.default.stringify(reqObj))];
                case 1:
                    res = (_a.sent());
                    if (res.result_code != 0)
                        jquery_1.default(location).attr('href', '/');
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getCarPeriodList = getCarPeriodList;
/*
export async function getTarrifs(reqObj) {
    return (await getRequestBuilder('tariff_list', queryString.stringify(reqObj))).cars;
}

export async function getCityList() {
    return (await getRequestBuilder('city_list', {})).cities;
}
export async function getServiceTypeList() {
    return getRequestBuilder('service_type_list', {});
}
export async function getServiceList() {
    return getRequestBuilder('service_list', {});
}
export async function getCarFreeList(reqObj) {
    const res = (await getRequestBuilder('car_free_list', queryString.stringify(reqObj))).cars;
    return res;
}

*/
function sendRequest(body) {
    return __awaiter(this, void 0, void 0, function () {
        var urlSuffix, url, token, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlSuffix = 'bid_create';
                    url = auth_1.server + ":" + auth_1.port + "/" + auth_1.dataApiEndpoint + "/" + urlSuffix;
                    return [4 /*yield*/, auth_1.getAccess()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Authorization': "Bearer " + token,
                            },
                            body: body,
                        })];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.sendRequest = sendRequest;
