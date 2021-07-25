import { dataFromServer } from "./state/dataFromServer";




export const rootSection = (placeHtml) => {
return ` <div style="background: #FAFAFB; padding: 15px">
    <div class="book__title">Забронировать
        <span class="bool_title-price" id="carPrice"></span>
    </div>
    <div id="dateListener" class="book__dates ex-inputs">
        <div id="leftDateFrame" class="book__field-start book__field-wrap book__outline">
            <input id="leftDate" class="ex-inputs-start book__field-value" placeholder="DD.MM.YYYY" readonly />
            <div class="book__field-subtitle">Дата получения</div>
        </div>
        <div id="rightDateFrame" class="book__field-end book__field-wrap">
            <input id="rightDate" class="ex-inputs-end book__field-value" placeholder="DD.MM.YYYY" readonly />
            <div class="book__field-subtitle">Дата возврата</div>
        </div>
        <div class="row">
            <div class="ex-inputs-picker"></div>
        </div>
    </div>
    <div id="timeSelects" class="timeSelects">
        <div id="receiveSelects" class="receiveSelects">
            <select id="selectReceiveDate" size="1" class="dateTimeSelect" disabled>
            </select>

        </div>
        <div id="returnSelects" class="returnSelects">
            <select id="selectReturnDate" class="dateTimeSelect" disabled>
            </select>
        </div>
    </div>
</div>

<div class="book__field-wrap">
    <select class="book__field book__field-receivePlaceSelect" id="receivePlaceSelect">
        ${placeHtml}
    </select>
    <div class="book__field-subtitle">Место получения</div>
</div>
<div id="receiveCustomPlace-wrap" class="book__field-wrap customPlace-wrap-start">
    <input type="text" id="receiveCustomPlace" class="book__field customPlace-hidden" placeholder="Введите адрес">
    <div class="book__field-subtitle">Куда подать авто?</div>
</div>
<div class="book__field-wrap">
    <select class="book__field book__field-receivePlaceSelect" id="returnPlaceSelect">
        ${placeHtml}
    </select>
    <div class="book__field-subtitle">Место возврата</div>
</div>
<div id="returnCustomPlace-wrap" class="book__field-wrap customPlace-wrap-end">
    <input type="text" id="returnCustomPlace" class="book__field customPlace-hidden" placeholder="Введите адрес">
    <div class="book__field-subtitle">Куда подать авто?</div>
</div>
<div class="book__subtitle">Ваши данные</div>
<form autocomplete="on">
    <div class="book__field-wrap">
        <input class="book__field" id="customerName" name="name" type="text" required placeholder="Введите имя" />
        <div class="book__field-subtitle">Имя и фамилия</div>
    </div>
    <div class="book__field-wrap">
        <input class="book__field" id="customerPhone" name="phone" type="tel" required placeholder="+7" />
        <div class="book__field-subtitle">Телефон</div>
    </div>
</form>
<div id="lawAgreement">
    <input type="checkbox" class="book__checkbox" id="age" value="yes">
    <label id="proofOfAgeAndExperience" class="book__radio" for="age">Мне больше 23 лет и мой водительский
        стаж больше 3 лет</label>
    <input type="checkbox" class="book__checkbox" id="agree" value="yes">
    <label id="agreementWithPolicy" class="book__radio" for="agree">Я согласен с Политикой обработки
        данных.</label>
</div>

<button class="book__btn" type="submit" id="bookButtonId">Забронировать</button>
<div class="book__checkup">
    <span id="carName"></span>
    <span id="periodRent"></span>
    <br>
    <span id="bidCost"></span>
    <span id="deposit"></span>
    <br>
    <span id="resolution"></span>
</div>
</div>

`}