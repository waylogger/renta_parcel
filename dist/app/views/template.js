"use strict";
/**
* @module template.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootSection = void 0;
var shared = __importStar(require("../shared/sharedData"));
var rootSection = function () {
    return "\n<div id=\"" + shared.domElementId.bookSelectDivId + "\" class=\"book__title tn-atom\">\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C\n\t<span class=\"bool_title-price\" id=\"carPrice\"></span>\n\t<select id=\"" + shared.domElementId.carSelectId + "\">\n\t</select>\n</div>\n<div id=\"" + shared.domElementId.bookModuleId + "\" class=\"carNotSelect\">\n\t<div id=\"" + shared.domElementId.formInputId + "\">\n\t\t<div id=\"somes\" style=\"background: #FAFAFB; padding: 15px\">\n\n\t\t\t<div id=\"dateListener\" class=\"book__dates ex-inputs\">\n\t\t\t\t<div id=\"leftDateFrame\" class=\"book__field-start book__field-wrap book__outline\">\n\t\t\t\t\t<input id=\"" + shared.domElementId.receiveDataId + "\"\n\t\t\t\t\t\tclass=\"ex-inputs-start book__field-value\" placeholder=\"DD.MM.YYYY\"\n\t\t\t\t\t\treadonly />\n\t\t\t\t\t<div id=\"" + shared.domElementId.receiveDateTextId + "\" class=\"book__field-subtitle\">\u0414\u0430\u0442\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F</div>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"receiveSelects\" class=\"receiveSelects\">\n\t\t\t\t\t<select id=\"" + shared.domElementId.selectReceiveTimeId + "\" size=\"1\"\n\t\t\t\t\t\tclass=\"dateTimeSelect\" disabled placeholder=\"--:--\">\n\t\t\t\t\t\t<option>\n\t\t\t\t\t\t\t00:00\n\t\t\t\t\t\t</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"rightDateFrame\" class=\"book__field-end book__field-wrap\">\n\t\t\t\t\t<input id=\"" + shared.domElementId.returnDataId + "\"\n\t\t\t\t\t\tclass=\"ex-inputs-end book__field-value\" placeholder=\"DD.MM.YYYY\"\n\t\t\t\t\t\treadonly />\n\t\t\t\t\t<div id=\"" + shared.domElementId.returnDateTextId + "\" class=\"book__field-subtitle\">\u0414\u0430\u0442\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430</div>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"returnSelects\" class=\"returnSelects\">\n\t\t\t\t\t<select id=\"" + shared.domElementId.selectReturnTimeId + "\" class=\"dateTimeSelect\"\n\t\t\t\t\t\tdisabled placeholder=\"--:--\">\n\t\t\t\t\t\t<option>\n\t\t\t\t\t\t\t00:00\n\t\t\t\t\t\t</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"ex-inputs-picker\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"book__field-wrap\">\n\t\t\t\t<select class=\"book__field book__field-receivePlaceSelect\"\n\t\t\t\t\tid=\"" + shared.domElementId.receivePlaceSelectId + "\">\n\t\t\t\t</select>\n\t\t\t\t<div class=\"book__field-subtitle\">\u041C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F</div>\n\t\t\t</div>\n\t\t\t<div id=\"" + shared.domElementId.receiveCustomPlaceId + "\"\n\t\t\t\tclass=\"book__field-wrap customPlace-wrap-start\">\n\t\t\t\t<input maxlength=\"200\" type=\"text\" id=\"" + shared.domElementId.receiveCustomPlaceInputId + "\"\n\t\t\t\t\tclass=\"book__field customPlace-hidden\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441\">\n\t\t\t\t<div class=\"book__field-subtitle\" id=\"" + shared.domElementId.receiveCustomTextId + "\">\u041A\u0443\u0434\u0430 \u043F\u043E\u0434\u0430\u0442\u044C \u0430\u0432\u0442\u043E?</div>\n\t\t\t</div>\n\t\t\t<div class=\"book__field-wrap\">\n\t\t\t\t<select class=\"book__field book__field-receivePlaceSelect\"\n\t\t\t\t\tid=\"" + shared.domElementId.returnPlaceSelectId + "\">\n\t\t\t\t</select>\n\t\t\t\t<div class=\"book__field-subtitle\">\u041C\u0435\u0441\u0442\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430</div>\n\t\t\t</div>\n\t\t\t<div id=\"" + shared.domElementId.returnCustomPlaceId + "\"\n\t\t\t\tclass=\"book__field-wrap customPlace-wrap-end\">\n\t\t\t\t<input maxlength=\"200\" type=\"text\" id=\"" + shared.domElementId.returnCustomPlaceInputId + "\"\n\t\t\t\t\tclass=\"book__field customPlace-hidden\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441\">\n\t\t\t\t<div class=\"book__field-subtitle\" id=\"" + shared.domElementId.returnCustomTextId + "\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u0430\u0432\u0442\u043E</div>\n\t\t\t</div>\n\t\t\t<div class=\"book__subtitle\">\u0412\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435</div>\n\t\t\t<form autocomplete=\"on\">\n\t\t\t\t<div class=\"book__field-wrap\">\n\t\t\t\t\t<input class=\"book__field\" id=\"" + shared.domElementId.custonersNameId + "\"\n\t\t\t\t\t\tname=\"name\" maxlength=\"50\" type=\"text\" required\n\t\t\t\t\t\tplaceholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F\" />\n\t\t\t\t\t<div id=\"" + shared.domElementId.customersNameTextId + "\" class=\"book__field-subtitle\">\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"book__field-wrap\">\n\t\t\t\t\t<input class=\"book__field\" id=\"" + shared.domElementId.customersPhoneId + "\"\n\t\t\t\t\t\tmaxlength=\"14\" name=\"phone\" type=\"tel\" required placeholder=\"+7\" />\n\t\t\t\t\t<div id=\"" + shared.domElementId.customersPhoneTextId + "\" class=\"book__field-subtitle\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t\t<div id=\"lawAgreement\">\n\t\t\t\t<input type=\"checkbox\" class=\"book__checkbox\" id=\"" + shared.domElementId.ageAgree + "\"\n\t\t\t\t\tvalue=\"yes\">\n\t\t\t\t<label id=\"" + shared.domElementId.proofOfAgeId + "\" class=\"book__radio\" for=\"age\">\u041C\u043D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 23 \u043B\u0435\u0442 \u0438\n\t\t\t\t\t\u043C\u043E\u0439\n\t\t\t\t\t\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439\n\t\t\t\t\t\u0441\u0442\u0430\u0436 \u0431\u043E\u043B\u044C\u0448\u0435 3 \u043B\u0435\u0442</label><br>\n\t\t\t\t<input type=\"checkbox\" class=\"book__checkbox\" id=\"" + shared.domElementId.policyAgree + "\"\n\t\t\t\t\tvalue=\"yes\">\n\t\t\t\t<label id=\"" + shared.domElementId.proofOfPolicyId + "\" class=\"book__radio\" for=\"agree\">\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439\n\t\t\t\t\t\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438\n\t\t\t\t\t\u0434\u0430\u043D\u043D\u044B\u0445.</label>\n\n\t\t\t</div>\n\t\t\t<button class=\"book__btn\" type=\"submit\"\n\t\t\t\tid=\"" + shared.domElementId.bookButtonId + "\">\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n\t\t\t<div id=\"" + shared.domElementId.bidTextId + "\" class=\"book__checkup\">\n\t\t\t\t<span id=\"" + shared.domElementId.carNameId + "\"></span>\n\t\t\t\t<span id=\"" + shared.domElementId.periodRentId + "\"></span>\n\t\t\t\t<span id=\"" + shared.domElementId.bidCostId + "\"></span>\n\t\t\t\t<span id=\"" + shared.domElementId.deliveryCostId + "\"></span>\n\t\t\t\t<br>\n\t\t\t\t<span id=\"" + shared.domElementId.costResolutionId + "\"></span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div id=\"console\"></div>\n\n</div>";
};
exports.rootSection = rootSection;