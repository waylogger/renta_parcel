import { isEqual, isWithinInterval } from "date-fns";
import { State } from "../../../state/state";





export async function gridRenderer(state: State): Promise<string> {

    function resHTML(timestamp: Date, e: number, dayRender: Function) {
        
        timestamp.setHours(0);
        timestamp.setMinutes(0);
        timestamp.setSeconds(0);
        timestamp.setMilliseconds(0);

        var res = "";
        var newDate = new Date(timestamp);
        newDate.setDate(1);
        newDate.setDate(1 - newDate.getDay() + e);
        
        e && newDate.getDate() === e + 1 && newDate.setDate(e - 6);
        for (var r = 0; r < 42; ++r) {
            const r = dayRender(newDate);
            res += r;
            
            newDate.setDate(newDate.getDate() + 1);
        }
        return res;
    }
    /**
     * @function
     * @param {Date}
     * @returns {HTMLButtonElement}
     * @description смысл функции в том, что она принимает timestamp и возвращает разметку HTML кнопки с необходимыми стилями: пограничный день(pg-edge-day), текущий день (dp-day-today),
     * неактивный день (dp-day-disabled), а также текущий и выбранный день (dp-current, dp-select)
    */
    function dayHTML(timestamp: Date) {
        var currentMonth = state.getSelectedMonthInx();

        // e === true if currenthMonth не равен t.Month(). Смысл переменной в том, что она используется для установления класса пограничного дня
        var onBorder = timestamp.getMonth() !== currentMonth;//Boolean
        // var n = !i.inRange(t);//Boolean 
        
        var shouldToDisabled = state.isDateBusy(timestamp);
        var attr = shouldToDisabled ? 'disabled' : '';
        // Если а установлено, то дата помечается как сегодняшнее число
        // var isToday = shouldToDisabled ? false : timestamp.getTime() === c;//Boolean
        //итоговая разметка кнопки
        var res = "dp-day";//String

        var isCurrent = false; //shouldToDisabled ? false : (t.getTime() === c) && (d === new Date().getMonth() + 1)
        var isSelected = state.isFirstDateOfRangeWasSelect() && isEqual(state.getFirstDateOfRange(),timestamp) || state.isSecondDateOfRangeWasSelect() && isEqual(state.getSecondDateOfRange(),timestamp) || state.isFirstDateOfRangeWasSelect() && state.isSecondDateOfRangeWasSelect() && isWithinInterval(
            timestamp,{
                start: state.getFirstDateOfRange(),
                end: state.getSecondDateOfRange()
            }
        );

        res += onBorder ? " dp-edge-day" : "";
        res += isCurrent ? " dp-current" : "";
        res += isSelected ? " dp-selected" : "";
        res += shouldToDisabled ? " dp-day-disabled" : "";
        // res += isToday ? " dp-day-today" : "";


        return `
					<button ${attr} tabindex="-1" type="button" class="${res}" data-date="${timestamp.getTime()}" id="day-${timestamp.getDate()}"> ${timestamp.getDate()} </button>
					`;

    }
    const days: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const weekStr = `${days.map(function (item, inx) {
            return `<span class="dp-col-header"> ${item} </span>`
    }).join("")}`
    const startDate = new Date();

    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setDate(1);
    startDate.setMonth(state.getSelectedMonthInx());
    
    const body = weekStr + resHTML(startDate, 1, dayHTML);
    return body;
}