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
var template_1 = require("./app/views/template");
var shared = __importStar(require("./app/shared/sharedData"));
var jquery_1 = __importDefault(require("jquery"));
var state_1 = require("./app/state/state");
var placeSelect_1 = require("./app/components/placeSelect");
var timeSelect_1 = require("./app/components/timeSelect");
var customersPhone_1 = require("./app/components/customersPhone");
var customersName_1 = require("./app/components/customersName");
var carSelect_1 = require("./app/components/carSelect");
var bidPreview_1 = require("./app/components/bidPreview");
var createBid_1 = require("./app/components/createBid");
var sharedActions_1 = require("./app/shared/sharedActions");
var checkHash = function () {
    if (location.hash === '#') {
        jquery_1.default("#" + shared.domElementId.bookModuleId).addClass('carNotSelect');
    }
    else {
        jquery_1.default("#" + shared.domElementId.bookModuleId).removeClass('carNotSelect');
    }
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jquery_1.default("#" + shared.domElementId.rootSectionId).html(template_1.rootSection());
                return [4 /*yield*/, state_1.BookingState()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, carSelect_1.carSelect(state)];
            case 2:
                _a.sent();
                jquery_1.default.when(jquery_1.default.ready).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        customersPhone_1.customersPhoneValidateAndSave(state);
                        customersName_1.nameValidateAndSave(state);
                        placeSelect_1.placeOptions(state);
                        placeSelect_1.selectPlace(state);
                        bidPreview_1.onPreview(state);
                        jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).on('change', function () { return timeSelect_1.correctionSecondTimeAfterFirst(state); });
                        jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).on('change', function () {
                            var _a;
                            var strT = (_a = jquery_1.default("#" + shared.domElementId.selectReceiveTimeId).val()) === null || _a === void 0 ? void 0 : _a.toString().split(':');
                            if (!strT)
                                return;
                            var h = parseInt(strT[0], 10);
                            var m = parseInt(strT[1], 10);
                            var timestamp = state.getFirstDateOfRange();
                            timestamp.setHours(h);
                            timestamp.setMinutes(m);
                            state.setFirstTimeOfRange(timestamp);
                        });
                        jquery_1.default("#" + shared.domElementId.selectReturnTimeId).on('change', function () {
                            var _a;
                            var strT = (_a = jquery_1.default("#" + shared.domElementId.selectReturnTimeId).val()) === null || _a === void 0 ? void 0 : _a.toString().split(':');
                            if (!strT)
                                return;
                            var h = parseInt(strT[0], 10);
                            var m = parseInt(strT[1], 10);
                            var timestamp = state.getSecondDateOfRange();
                            timestamp.setHours(h);
                            timestamp.setMinutes(m);
                            state.setSecondTimeOfRange(timestamp);
                            state.setMainCar();
                        });
                        jquery_1.default("#" + shared.domElementId.bookButtonId).on('click', function () { return createBid_1.createBid(state); });
                        jquery_1.default("#proofOfAgeAndExperience").on('click', function () {
                            var check = state.toggleAgeChecker();
                            if (check)
                                jquery_1.default("#" + shared.domElementId.ageAgree).attr('checked', 'true');
                            else
                                jquery_1.default("#" + shared.domElementId.ageAgree).attr('checked', null);
                            sharedActions_1.validateChecker(shared.domElementId.ageAgree, shared.domElementId.proofOfAgeId);
                        });
                        jquery_1.default("#agreementWithPolicy").on('click', function () {
                            var check = state.togglePolicyChecker();
                            if (check)
                                jquery_1.default("#" + shared.domElementId.policyAgree).attr('checked', 'true');
                            else
                                jquery_1.default("#" + shared.domElementId.policyAgree).attr('checked', null);
                            sharedActions_1.validateChecker(shared.domElementId.policyAgree, shared.domElementId.proofOfPolicyId);
                        });
                        jquery_1.default("#" + shared.domElementId.receiveCustomPlaceInputId).on('focusout', function () {
                            sharedActions_1.validateField(shared.domElementId.receiveCustomPlaceInputId, shared.domElementId.receiveCustomTextId);
                        });
                        jquery_1.default("#" + shared.domElementId.returnCustomPlaceInputId).on('focusout', function () {
                            sharedActions_1.validateField(shared.domElementId.returnCustomPlaceInputId, shared.domElementId.returnCustomTextId);
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); })();