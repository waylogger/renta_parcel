import { State } from "../../../state/state";
import * as shared from '../../../shared/sharedData';





// 			onClick: {
// 				"dp-day": function (t, e) {
// 					t.stoppropagation();
// 					var dt = new date(parseint(t.target.getattribute("data-date")));

// 					if (mystate.isfirstdateofrangewasselect()) {
// 						var days = $(`.dp-day`).toarray();
// 						days = days.filter(
// 							(item) => $(item).hasclass('dr-in-range')
// 						);
// 						var bad = '';
// 						days.foreach(
// 							(item) => {
// 								const d = $(item).hasclass('dp-day-disabled');
// 								if (d) bad = true;
// 							}
// 						);
// 						if (bad) return;
// 					};
// 					e.setstate({
// 						selecteddate: dt,
// 					})
// 					/**
// 					 * @author wlr986
// 					*/
// 					if (mystate.isfirstdateofrangewasselect() && mystate.isseconddateofrangewasselect()) {
// 						mystate.dropfirstdateofrange();
// 						mystate.dropseconddateofrange();
// 					}
// 					if (mystate.isfirstdateofrangewasselect()) {

// 						$('#dp-close-btn').html('сохранить');
// 						mystate.setseconddateofrange(dt);
// 						return;
// 					}
// 					mystate.setfirstdateofrange(dt);


export async function canvasRenderer(state: State): Promise<string> {


        const monthNamespace: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


        const header = `
					<div class="dp-cal"> 
					<header class="dp-cal-header"> 
						<button tabindex="-1" type="button" id="${shared.domElementId.dpPrevMonth}" class="dp-prev">Prev</button>
                                                <div tabindex="-1" type="button" class="dp-cal-month" id="dp-cal-month-text">
					${monthNamespace[state.getSelectedMonthInx()]}</div>
                                        	<div tabindex="-1" type="button" class="dp-cal-year">
                                                ${state.getSelectedYear()}
                                                </div>
						<button tabindex="-1" type="button" id="${shared.domElementId.dpNextMonth}" class="dp-next">Next</button>
						</header>
                                          
						<div id="${shared.domElementId.calendarGridId}" class="dp-days">

				</div>
					`

        const footer = `
				<footer class="dp-cal-footer">
				<button tabindex="-1" type="button" class="dp-clear">Очистить</button>
				<button onClick="
				document.querySelector('.ex-inputs-picker').classList.remove('ex-inputs-picker-visible');" tabindex="-1" type="button" class="dp-close" id="dp-close-btn">Закрыть</button>
				</footer>
				</div>`


        return header + footer;
}

