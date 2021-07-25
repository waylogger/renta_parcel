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
exports.CalendarEnjector = void 0;
var Calendar_1 = require("./Calendar");
var jquery_1 = __importDefault(require("jquery"));
function CalendarEnjector() {
    return __awaiter(this, void 0, void 0, function () {
        function showPicker() {
            container.classList.add('ex-inputs-picker-visible');
        }
        function hidePicker() {
            clearTimeout(previousTimeout);
            previousTimeout = setTimeout(function () {
                if (!root.contains(document.activeElement)) {
                    container.classList.remove('ex-inputs-picker-visible');
                }
            }, 10);
        }
        var root, txtStart, txtEnd, container, previousTimeout;
        return __generator(this, function (_a) {
            root = document.querySelector('.ex-inputs');
            txtStart = root.querySelector('.ex-inputs-start');
            txtEnd = root.querySelector('.ex-inputs-end');
            container = root.querySelector('.ex-inputs-picker');
            // Inject DateRangePicker into our container
            Calendar_1.DateRangePicker(container).on('statechange', function (_, rp) {
                var range = rp.state;
                /**
                 * @author wlr986
                 * @description saving time data when change date
                */
                // let startModifier = '';
                // let endModifier = '';
                // dataFromServer.dateIsBad = true;
                // const currDateStart = $('#leftDate').val();
                // const dataArrStart = currDateStart.split(' ');
                // const currDateEnd = $('#rightDate').val();
                // const dataArrEnd = currDateEnd.split(' ');
                // if (currDateStart.length > 0 && dataArrStart.length > 1 && dataArrStart[1] != '') {
                //     startModifier = dataArrStart[1];
                // }
                // if (currDateEnd.length > 0 && dataArrEnd.length > 1 && dataArrEnd[1] != '') {
                //     endModifier = dataArrEnd[1];
                // }
                txtStart.value = range.start
                    ? range.start.toLocaleDateString()
                    : '';
                if (txtStart.value)
                    txtEnd.value = range.end
                        ? range.end.toLocaleDateString()
                        : '';
                else
                    txtEnd.value = '';
                // let leftDateInsert = false;
                // let rightDateInsert = false;
                // if (txtStart.value) {
                //     $('#selectReceiveDate').attr('disabled', null);
                //     leftDateInsert = true;
                // } else {
                //     $('#selectReceiveDate').attr('disabled', true);
                // }
                // if (txtEnd.value) {
                //     $('#selectReturnDate').attr('disabled', null);
                //     rightDateInsert = true;
                // } else {
                //     $('#selectReturnDate').attr('disabled', true);
                // }
                // if (leftDateInsert && rightDateInsert) {
                //     state[dateObj.inx] = true;
                //     coloringBorder(dateObj.inx, fieldClasses.validationPassed);
                //     datePreview();
                //     costPreview();
                // } else {
                //     datePreview();
                //     costPreview();
                //     state[dateObj.inx] = false;
                //     deColoringBorder(dateObj.inx, fieldClasses.validationPassed);
                // }
            });
            // When the inputs gain focus, show the date range picker
            txtStart.addEventListener('focus', showPicker);
            txtEnd.addEventListener('focus', showPicker);
            jquery_1.default('.dr-cal-end').detach();
            jquery_1.default('.dp-next').css('visibility', 'visible');
            return [2 /*return*/];
        });
    });
}
exports.CalendarEnjector = CalendarEnjector;
