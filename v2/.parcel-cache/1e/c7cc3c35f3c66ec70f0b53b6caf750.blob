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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccess = exports.dataApiEndpoint = exports.refreshEndpoint = exports.signInEndpoint = exports.port = exports.server = void 0;
// import 'regenerator-runtime/runtime'
require("whatwg-fetch");
var SessionKey_1 = require("./entities/SessionKey");
exports.server = 'http://81.177.48.80';
exports.port = '50500';
var passwordHash = 'f7f8e967f2756082ada759e8e189e772e00a1deb13583e9beee02ad9a5420fda5ce2069e942cdc22a8cae4ecb90ace005737c6c96dd655330f0f1ae6a0ffd8fc';
var login = 'USER_FOR_SITE';
exports.signInEndpoint = '/api/v1/tokens/signin';
exports.refreshEndpoint = '/api/v1/tokens/refresh';
exports.dataApiEndpoint = 'data_api';
var Auth = /** @class */ (function () {
    // --------------------------------------------------------------------------------------------
    function Auth(accessData) {
        var _a;
        this.token = (_a = {}, _a[SessionKey_1.accessTokenKey] = '', _a[SessionKey_1.refreshTokenKey] = '', _a[SessionKey_1.expiredKey] = 0, _a);
        this.accessData = accessData;
    }
    // --------------------------------------------------------------------------------------------
    Auth.prototype.readFromSessionStorage = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var aTK, rTK, eTK, resObj;
            var _a, _b;
            return __generator(this, function (_c) {
                if (window) {
                    aTK = sessionStorage.getItem(SessionKey_1.accessTokenKey);
                    rTK = sessionStorage.getItem(SessionKey_1.refreshTokenKey);
                    eTK = sessionStorage.getItem(SessionKey_1.expiredKey);
                    resObj = (_a = {},
                        _a[SessionKey_1.accessTokenKey] = aTK ? aTK : '',
                        _a[SessionKey_1.refreshTokenKey] = rTK ? rTK : '',
                        _a[SessionKey_1.expiredKey] = eTK ? parseInt(eTK, 10) : 0,
                        _a);
                    return [2 /*return*/, resObj];
                }
                else
                    return [2 /*return*/, (_b = {}, _b[SessionKey_1.accessTokenKey] = "", _b[SessionKey_1.refreshTokenKey] = "", _b[SessionKey_1.expiredKey] = 0, _b)];
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------------------------
    Auth.prototype.getSavedSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFromSessionStorage([SessionKey_1.accessTokenKey, SessionKey_1.refreshTokenKey, SessionKey_1.expiredKey])];
                    case 1:
                        savedToken = _a.sent();
                        if (!savedToken[SessionKey_1.accessTokenKey] || !savedToken[SessionKey_1.refreshTokenKey] || !savedToken[SessionKey_1.expiredKey])
                            return [2 /*return*/, undefined];
                        else
                            return [2 /*return*/, savedToken];
                        return [2 /*return*/];
                }
            });
        });
    };
    //---------------------------------------------------------------------------------------------
    Auth.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, bdy, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window)
                            return [2 /*return*/, this.token];
                        path = exports.server + ":" + exports.port + exports.signInEndpoint;
                        bdy = JSON.stringify(this.accessData);
                        return [4 /*yield*/, fetch(path, {
                                method: 'POST',
                                body: bdy,
                                headers: { 'Content-Type': 'application/json' }
                            }).then(function (res) { return res.json(); }).then(function (res) { return res; })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Auth.prototype.saveInSessionStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                sessionStorage.setItem(SessionKey_1.accessTokenKey, this.token[SessionKey_1.accessTokenKey]);
                sessionStorage.setItem(SessionKey_1.refreshTokenKey, this.token[SessionKey_1.refreshTokenKey]);
                sessionStorage.setItem(SessionKey_1.expiredKey, this.token[SessionKey_1.expiredKey].toString());
                return [2 /*return*/];
            });
        });
    };
    Auth.prototype.saveSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.saveInSessionStorage();
                return [2 /*return*/];
            });
        });
    };
    //---------------------------------------------------------------------------------------------
    Auth.prototype.tokenExpired = function (token) {
        return token[SessionKey_1.expiredKey] < Math.floor(Date.now() / 1000);
    };
    Auth.prototype.refreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var path, bdy, newToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token || !token[SessionKey_1.refreshTokenKey]) {
                            throw new Error('Refresh token failure');
                        }
                        path = exports.server + ":" + exports.port + exports.refreshEndpoint;
                        bdy = JSON.stringify({
                            Token: token[SessionKey_1.refreshTokenKey],
                        });
                        return [4 /*yield*/, fetch(path, {
                                method: 'POST',
                                body: bdy,
                                headers: { 'Content-Type': 'application/json' },
                            }).then(function (res) { return res.json(); }).then(function (res) { return res; })];
                    case 1:
                        newToken = _a.sent();
                        return [2 /*return*/, newToken];
                }
            });
        });
    };
    Auth.prototype.auth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedToken, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getSavedSecret()];
                    case 1:
                        savedToken = _c.sent();
                        if (!!savedToken) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.getToken()];
                    case 2:
                        _a.token = _c.sent();
                        if (!this.token)
                            throw new Error('codes.authFailure');
                        return [4 /*yield*/, this.saveSecret()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, this.token];
                    case 4:
                        if (!this.tokenExpired(savedToken)) return [3 /*break*/, 7];
                        _b = this;
                        return [4 /*yield*/, this.refreshToken(savedToken)];
                    case 5:
                        _b.token = _c.sent();
                        if (!this.token)
                            throw new Error('codes.authFailure');
                        return [4 /*yield*/, this.saveSecret()];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, this.token];
                    case 7:
                        this.token = savedToken;
                        return [2 /*return*/, this.token];
                }
            });
        });
    };
    return Auth;
}());
/**
 * @returns ключ доступа для включения в заголовок Authorization
 * */
function getAccess() {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Auth({ PasswordHash: passwordHash, UserName: login, LongToken: true }).auth()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, token[SessionKey_1.accessTokenKey]];
            }
        });
    });
}
exports.getAccess = getAccess;
