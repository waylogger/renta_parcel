/**
 * @module CalendarEnjector.js
 * @author Chris Davies <https://github.com/chrisdavies>
 * @remarks кое-что правил wlr986 <wayloggerman@gmail.com>
*/
import { whenDataLoad } from './loadData'
import { DateRangePicker } from './Calendar'
import { datePreview, costPreview } from './handlers';
import { state, deColoringBorder, coloringBorder, getFreeReceiveTime } from './handlers'
import { dateObj, fieldClasses } from './namespaces'
import $ from 'jquery';
import { dataFromServer } from './state/dataFromServer';

export async function CalendarEnjector() {

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
    txtStart.addEventListener('focus', showPicker); txtEnd.addEventListener('focus', showPicker);
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

    $('.dr-cal-end').detach();
    $('.dp-next').css('visibility', 'visible');
}

