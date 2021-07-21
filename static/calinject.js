
import { whenDataLoad } from './loadData'
import { DateRangePicker } from './cal'
import { datePreview, costPreview } from './handlers';
import { state, deColoringBorder, coloringBorder, getFreeReceiveTime } from './handlers'
import { dateObj, fieldClasses } from './namespaces'
import $ from 'jquery';
import { dataFromServer } from './state/dataFromServer';

export async function calInject() {

    const root = document.querySelector('.ex-inputs');
    const txtStart = root.querySelector('.ex-inputs-start');
    const txtEnd = root.querySelector('.ex-inputs-end');
    const container = root.querySelector('.ex-inputs-picker');
    // Inject DateRangePicker into our container
    DateRangePicker(container).on('statechange', function (_, rp) { // Update the inputs when the state changes
        var range = rp.state;
        /**
         * @author wlr986
         * @description saving time data when change date
        */
        let startModifier = '';
        let endModifier = '';
        dataFromServer.dateIsBad = true;
        const currDateStart = $('#leftDate').val();
        const dataArrStart = currDateStart.split(' ');
        const currDateEnd = $('#rightDate').val();
        const dataArrEnd = currDateEnd.split(' ');



        if (currDateStart.length > 0 && dataArrStart.length > 1 && dataArrStart[1] != '') {
            startModifier = dataArrStart[1];
        }
        if (currDateEnd.length > 0 && dataArrEnd.length > 1 && dataArrEnd[1] != '') {
            endModifier = dataArrEnd[1];
        }
        txtStart.value = range.start
            ? range.start.toLocaleDateString() + ' ' + startModifier
            : '';
        if (txtStart.value)
            txtEnd.value = range.end
                ? range.end.toLocaleDateString() + ' ' + endModifier
                : '';
        else
            txtEnd.value = '';
        let leftDateInsert = false;
        let rightDateInsert = false;
        if (txtStart.value) {
            $('#selectReceiveDate').attr('disabled', null);
            leftDateInsert = true;
        } else {
            $('#selectReceiveDate').attr('disabled', true);
        }
        if (txtEnd.value) {
            $('#selectReturnDate').attr('disabled', null);
            rightDateInsert = true;
        } else {
            $('#selectReturnDate').attr('disabled', true);
        }
        if (leftDateInsert && rightDateInsert) {
            state[dateObj.inx] = true;
            coloringBorder(dateObj.inx, fieldClasses.validationPassed);
            datePreview();
            costPreview();

        } else {

            datePreview();
            costPreview();
            state[dateObj.inx] = false;
            deColoringBorder(dateObj.inx, fieldClasses.validationPassed);
        }
    });
    // When the inputs gain focus, show the date range picker
    $('#dateListener').bind('focusin', showPicker);
    // txtStart.addEventListener('focus', showPicker); txtEnd.addEventListener('focus', showPicker);
    function showPicker() {
        container.classList.add('ex-inputs-picker-visible');
    }
    // If focus leaves the root element, it is not in the date picker or the inputs, so we should hide the date picker we do
    // this in a setTimeout because redraws cause temporary loss of focus.
    let previousTimeout;
    function hidePicker() {
        clearTimeout(previousTimeout);
        previousTimeout = setTimeout(function () {
            if (!root.contains(document.activeElement)) {
                container.classList.remove('ex-inputs-picker-visible');
            }
        }, 10);

    }

    // root.addEventListener('focusout', hidePicker);

    $('.dr-cal-end').detach();
    $('.dp-next').css('visibility', 'visible');


}

               //
                // <!--
                //     <div class="book__field-value"><span>Владикавказ</span> ул. Кырджалийская 8а</div>
                // </div> <ul id="book__place-options" class="book__place-options">
                //     <a href="">
                //         <li>
                //             Аэропорт Беслан
                //             <span class="book__place-add-price">+ 1&nbsp;000₽</span>
                //         </li>
                //     </a>
                //     <li>
                //         Аэропорт Магас
                //         <span class="book__place-add-price">+ 2&nbsp;000₽</span>
                //     </li>
                //     <li>
                //         Подача авто по городу
                //         <span class="book__place-add-price">+ 300₽</span>
                //     </li>
                // </ul> -->
                // <!--
                //         <div class="book__field" id="returnPlace">
                //             <div class="book__field-subtitle">Место возврата</div>
                //             <div class="book__field-value"><span>Владикавказ</span> ул. Кырджалийская 8а</div>
                //         </div>
                //         <ul id="book__place-options" class="book__place-options">
                //             <a href="">
                //                 <li>
                //                     Аэропорт Беслан
                //                     <span class="book__place-add-price">+ 1&nbsp;000₽</span>
                //                 </li>
                //             </a>
                //             <li>
                //                 Аэропорт Магас
                //                 <span class="book__place-add-price">+ 2&nbsp;000₽</span>
                //             </li>
                //             <li>
                //                 Подача авто по городу
                //                 <span class="book__place-add-price">+ 300₽</span>
                //             </li>
                //         </ul>
                //         <input type="range" id="returnTimeRange" disabled="disabled" max="96"> --></input>
