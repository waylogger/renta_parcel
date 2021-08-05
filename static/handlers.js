import _ from 'lodash'
import {
	dateObj
} from './namespaces'
import {
	receivePlace
} from './namespaces'
import {
	returnPlace
} from './namespaces'
import {
	customerName
} from './namespaces'
import {
	customerPhone
} from './namespaces'
import {
	lawAgreementNamespace
} from './namespaces'
import {
	dataFromServer
} from './state/dataFromServer'
import {
	getCost
} from './connection/index';
import {
	fieldClasses
} from './namespaces'
import {
	addHours,
	addMinutes,
	eachMinuteOfInterval,
	hoursToMilliseconds,
	isBefore,
	isEqual,
	isWithinInterval,
	milliseconds,
	minutesToMilliseconds,
	parse,
	startOfDay
} from 'date-fns'
import $ from 'jquery';
import {
	format
} from 'date-fns'

// ------------------------------------------------------------------------------------------------
/**
 * @file handlers.js
 * @module handlers.js
 * @author wlr961 wayloggerman@gmail.com for toprent15.ru
 */
// ------------------------------------------------------------------------------------------------

/**
 * @global
 * @type {array}
 * 
 * @description object in array defined in namespaces.js
 */
export const fieldHandlers = [
	dateObj,
	receivePlace,
	returnPlace,
	customerName,
	customerPhone,
	lawAgreementNamespace
]

// ------------------------------------------------------------------------------------------------
/**
 * @global
 * @type {Array}
 */
export const state = new Array(fieldHandlers.length).fill(false);

// ------------------------------------------------------------------------------------------------
/**
 * @global
 * @type {array}
 * @description define state of 2 checkboxes 
 */
export const lawAgreements = new Array(2).fill('');

// ------------------------------------------------------------------------------------------------
/**
 * @global
 * @type {number}
 * @description index pf age and experience checkbox
 */
export const ageExpInx = 0;
/**
 * @global
 * @type {number}
 * @description index of agreement's checkbox 
 * 
 */

// ------------------------------------------------------------------------------------------------
export const agreePolicyInx = 1;
/**
 * @function
 * @param {number} inx in state
 * @param {string} fieldClass css class
 * @description coloring border 
 */

// ------------------------------------------------------------------------------------------------
export function coloringBorder(inx, fieldClass) {
	$(`#${fieldHandlers[inx].id}`).addClass(fieldClass);
}
/**
 * @function
 * @param {number} inx in state
 * @param {string} fieldClass css class
 * @description decoloring border 
 */

// ------------------------------------------------------------------------------------------------
export function deColoringBorder(inx, fieldClass) {
	$(`#${fieldHandlers[inx].id}`).removeClass(fieldClass);
}
//-------------------------------------------------------------------------------------------------


/**
 * @function
 * @description reformat date
 * @example
 * 	from 11.12.2011 10:00 
 * 	to 2011-12-11 10:00
 * @param {string} date
 */

// ------------------------------------------------------------------------------------------------
export function reformDate(date) {
	if (!date) return;
	let [dt, time] = date.split(' ');
	dt = dt.split('.').reverse().join('-');

	return `${dt} ${time}`;
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {object}
 * @returns {FormData}
 * @description принимает объект и возвращает форму
 */
export function objToFormData(obj) {
	const form = new FormData();
	Object.keys(obj).forEach(
		(item) => {
			form.append(item, obj[item]);
		}
	)

	return form;

}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Date} start
 * @param {Date} end
 * @returns {string} duration
 * @example ('01-01-2000 10:00', '02-01-2000 10:00') => (на 1 день с 01.01.2000 г. 10:00 по 02.02.2000 10:00)
 */
export function translateDate(start, end) {
	if (!start || !end) return '';

	const d1 = new Date(start.split(' ')[0]);
	const d2 = new Date(end.split(' ')[0]);
	const t1 = start.split(' ')[1];
	const t2 = end.split(' ')[1];

	const numOfDays = ((d2 - d1) / 1000 / (24 * 3600)) + 1;
	const numOfDaysStr = numOfDays.toString();
	let dayWord = '';
	let last2num = parseInt(numOfDaysStr, 10);
	if (last2num >= 10 && last2num <= 19) {
		dayWord = 'дней'
		return `на ${numOfDaysStr} ${dayWord} с ${d1.toLocaleDateString()} ${t1} по ${d2.toLocaleDateString()} ${t2}`;
	}
	let lastNum = parseInt(numOfDaysStr.charAt(numOfDaysStr.length - 1), 10);
	if (lastNum === 1) dayWord = 'день';
	else if (lastNum === 0) dayWord = 'дней';
	else if (lastNum > 1 && lastNum < 5) dayWord = 'дня';
	else if (lastNum >= 5) dayWord = 'дней';
	return `на ${numOfDaysStr} ${dayWord} с ${d1.toLocaleDateString()} ${t1} по ${d2.toLocaleDateString()} ${t2}`;



}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @description "book" button handler the function should collect data from the fields, transform the data and send it to the server
 * 
 */
export async function bookCar() {
	if (dataFromServer.dataSent) return;
	let badBit = false;
	state.forEach((el, inx) => {
		if (!el) {
			// coloringBorder(inx, fieldClasses.validationFailed);
			badBit = true;
		} else {
			// coloringBorder(inx, fieldClasses.validationPassed);
		}
	})

	const custName = `${$(`#${customerName.id}`).val()} -`
	const custPhone = `${$(`#${customerPhone.id}`).val()}`;
	const car_id = 9;
	const begin = reformDate($(`#leftDate`).val());
	const end = reformDate($(`#rightDate`).val());
	const receivePlaceId = dataFromServer.getPlaceId($(`#receivePlaceSelect`).val());
	const returnPlaceId = dataFromServer.getPlaceId($(`#returnPlaceSelect`).val());
	const include_reserves = true;
	const include_idles = true;
	const city_id = 1;
	if (badBit) return false;


	const bidObj = {
		fio: custName,
		phone: custPhone,
		car_id: 9,
		begin: begin,
		end: end,
		begin_place_id: receivePlaceId,
		end_place_id: returnPlaceId,
		prepayment: 0,
		file: '',
	}

		;
	const bidForm = objToFormData(bidObj);

	// const bid = await sendRequest(bidForm);
	// if (bid.bid_id) {
	// 	$(`#bookButtonId`).text('Поздравляем! Заявка на бронироавние успешно отправлена!');
	// 	$(`#bookButtonId`).removeClass('book__btn');
	// 	$(`#bookButtonId`).addClass('book__btn_send');
	// 	dataFromServer.dataSent = true;
	// }
	return true;
}
//-------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {number} percent
 * @returns {Date} HH:MM
 * @description convert percent to HH:MM
 * 
 */
export function percentsToTime(percent) {
	//проценты это шаги по 15 минут, 1 процент - 15 минут
	const minutes = percent * 15;

	const milisecondsPerMinutes = 1000 * 60 * minutes;
	//convert Thu, 01 Jan 1970 12:00:00 GMT
	//to 12:00
	return (new Date(milisecondsPerMinutes).toUTCString().split(' ')[4]).slice(0, 5);
}


//-------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {number} percent
 * @returns {Date} HH:MM
 * @description convert HH:MM to percent
 * 
 */
export function timeToPercent(timestamp) {
	//проценты это шаги по 15 минут, 1 процент - 15 минут
	// const minutes = percent * 15;

	const mil = hoursToMilliseconds(timestamp.getHours()) + minutesToMilliseconds(timestamp.getMinutes());

	const percent = Math.ceil(mil / hoursToMilliseconds(24) * 100);
	return percent - 3;
	//convert Thu, 01 Jan 1970 12:00:00 GMT
	//to 12:00
	// return (new Date(milisecondsPerMinutes).toUTCString().split(' ')[4]).slice(0, 5);
}


//-------------------------------------------------------------------------------------------------
/**
 * @function
 * @description transfers the time input to the display field 
 */
export function transferReceiveTime() {
	const time = percentsToTime($(this).val());
	const data = $('#leftDate').val();
	const date = data.length > 0 ? data.split(' ')[0] : '';
	if (date === '') return;
	$('#leftDate').val(`${date} ${time}`);
}
//-------------------------------------------------------------------------------------------------
/**
 * @function
 * @description transfers the time input to the display field 
 */
export function transferReturnTime() {
	const time = percentsToTime($(this).val());
	const data = $('#rightDate').val();
	const date = data.length > 0 ? data.split(' ')[0] : '';
	if (date === '') return;
	$('#rightDate').val(`${date} ${time}`);
}
//-------------------------------------------------------------------------------------------------
/**
 * @function
 * @description checking input of phone number and show results
 */
export function checkingInputPhone() {
	const inx = customerPhone.inx;
	if (validationPhone($(`#${customerPhone.id}`).val())) {
		state[inx] = true;
		coloringBorder(inx, fieldClasses.validationPassed);
		deColoringBorder(inx, fieldClasses.validationFailed);
		return;
	}
	state[inx] = false;
	coloringBorder(inx, fieldClasses.validationFailed);
	deColoringBorder(inx, fieldClasses.validationPassed);
}
/**
 * @function
 * @param {object} namespace
 * @param {function} validator
 * 
 * @description universal handler which colored border of element (namespace) on dependies of validation
 */
export function inputHandler(namespace, validator) {
	return () => {
		const inx = namespace.inx;
		if (validator($(`#${namespace.id}`).val())) {
			state[inx] = true;
			coloringBorder(inx, fieldClasses.validationPassed);
			deColoringBorder(inx, fieldClasses.validationFailed);
			return;
		}
		state[inx] = false;
		coloringBorder(inx, fieldClasses.validationFailed);
		deColoringBorder(inx, fieldClasses.validationPassed);
	}
}

// ------------------------------------------------------------------------------------------------
export function phoneAdditional() {
	if ($(this).val() == '') $(this).val('+7');
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @type {void}
 * @description function with side effect: set class on agreement field, if all checkbox are checked, and managment of lawAgreement
 */

export function lawAgreementHandlerAgeExpr() {
	return () => {
		lawAgreement[ageExpInx] = lawAgreement[ageExpInx] === true ? false : true;

		if (lawAgreement[ageExpInx] && lawAgreement[agreePolicyInx]) {
			$(`#${lawAgreementNamespace.id}`).addClass(fieldClasses.validationPassed);

			state[lawAgreementNamespace.inx] = true;
		} else if (!lawAgreement[ageExpInx] || !lawAgreement[agreePolicyInx]) {
			$(`#${lawAgreementNamespace.id}`).removeClass(fieldClasses.validationPassed);
			state[lawAgreementNamespace.inx] = false;
		}
	}
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @type {void}
 * @description function with side effect: set class on agreement field, if all checkbox are checked, and managment of lawAgreement
 */
export function lawAgreementHandlerAgreePolicy() {
	return () => {
		lawAgreement[agreePolicyInx] = lawAgreement[agreePolicyInx] === true ? false : true;
		if (lawAgreement[ageExpInx] && lawAgreement[agreePolicyInx]) {
			$(`#${lawAgreementNamespace.id}`).addClass(fieldClasses.validationPassed);
			state[lawAgreementNamespace.inx] = true;
		} else if (!lawAgreement[ageExpInx] || !lawAgreement[agreePolicyInx]) {
			$(`#${lawAgreementNamespace.id}`).removeClass(fieldClasses.validationPassed);
			state[lawAgreementNamespace.inx] = false;
		}
	}
}
/**
 * @function
 * @description managment state of receivePlace
 * 
 * */

// ------------------------------------------------------------------------------------------------
export function receivePlaceHandle() {
	const val = $('#receivePlaceSelect').val();
	if (val != '') {
		state[receivePlace.inx] = true;
		coloringBorder(receivePlace.inx, fieldClasses.validationPassed);
	} else {
		state[receivePlace.inx] = false;
		deColoringBorder(receivePlace.inx, fieldClasses.validationPassed);
	}
}


// ------------------------------------------------------------------------------------------------

/**
 * @function
 * @description managment state of returnPlace
 * 
 * */

export function returnPlaceHandle() {
	const val = $('#returnPlaceSelect').val();
	if (val != '') {
		state[returnPlace.inx] = true;
		coloringBorder(returnPlace.inx, fieldClasses.validationPassed);
	} else {
		state[returnPlace.inx] = false;
		deColoringBorder(returnPlace.inx, fieldClasses.validationPassed);
	}
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 */
export async function carPreview() {
	const currCar = dataFromServer.getCurrentCar();
	if (!currCar) return;
	/*
	тут убираем цвет, а после его выбора, надпись обновится
	*/
	//0 потому что все машине в массиве отличаются только цветом
	const car = currCar[0].model.replace(/\([^\s]+\)/, ''); //убираем цвет
	$('#carName').text(`Аренда: ${car}`);
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 */
export function datePreview() {

	if (dataFromServer.dateIsBad) return;

	const begin = reformDate($(`#leftDate`).val());
	const end = reformDate($(`#rightDate`).val());
	$(`#periodRent`).text(translateDate(begin, end));
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 */
export async function costPreview() {

	if (dataFromServer.dateIsBad) return;

	const begin = reformDate($(`#leftDate`).val());
	const end = reformDate($(`#rightDate`).val());
	let receivePlaceId = dataFromServer.getPlaceId($(`#receivePlaceSelect`).val());
	receivePlaceId = receivePlaceId ? receivePlaceId : dataFromServer.getFreePlace();
	let returnPlaceId = dataFromServer.getPlaceId($(`#returnPlaceSelect`).val());
	returnPlaceId = returnPlaceId ? returnPlaceId : dataFromServer.getFreePlace();


	if (!begin || !end) {
		const deliveryCost = dataFromServer.getDeliveryCost(receivePlaceId) + dataFromServer.getDeliveryCost(returnPlaceId);
		const resolution = `Итого: ${deliveryCost} ₽`;
		$(`#bidCost`).text(`Cтоимость доставки авто ${deliveryCost} ₽`);
		$(`#resolution`).text(resolution);
		return;
	}
	if (dataFromServer.carToBid === '') throw new Error('bad');
	const bidCostObj = {
		car_id: dataFromServer.carToBid,
		begin: begin,
		end: end,
		begin_place_id: receivePlaceId,
		end_place_id: returnPlaceId,
	}
	const bidCost = await getCost(bidCostObj)

	const deliveryCost = dataFromServer.getDeliveryCost(receivePlaceId) + dataFromServer.getDeliveryCost(returnPlaceId);

	const depositStr = `+ залог (возвращаем полностью по окончанию аренды) ${bidCost.deposit} ₽`

	const resolution = `Итого: ${bidCost.cost + bidCost.deposit + deliveryCost} ₽`;

	if (deliveryCost > 0) $(`#bidCost`).text(`Cтоимость аренды ${bidCost.cost - deliveryCost} ₽ + доставка авто ${deliveryCost} ₽`);
	else $(`#bidCost`).text(`Cтоимость аренды: ${bidCost.cost} ₽ `);

	$(`#deposit`).text(depositStr);
	$(`#resolution`).text(resolution)
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 */
export function showCustomReceivePlaceInput() {


	if ($(this).val() === 'Подача по городу + 300 ₽') {
		$(`#receiveCustomPlace`).removeClass('customPlace-hidden');
		$(`#receiveCustomPlace`).addClass('customPlace-visible');

		$(`#receiveCustomPlace-wrap`).removeClass('customPlace-wrap-start');
		$(`#receiveCustomPlace-wrap`).removeClass('customPlace-hidden');
		$(`#receiveCustomPlace-wrap`).addClass('customPlace-visible');
	} else {
		setTimeout(() => {
			$(`#receiveCustomPlace`).removeClass('customPlace-visible');
			$(`#receiveCustomPlace`).addClass('customPlace-hidden');

			$(`#receiveCustomPlace-wrap`).addClass('customPlace-hidden');
			$(`#receiveCustomPlace-wrap`).addClass('customPlace-wrap-start');
			$(`#receiveCustomPlace-wrap`).removeClass('customPlace-visible');
		}, 200);
	}

}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 */
export function showCustomReturnPlaceInput() {

	if ($(this).val() === 'Подача по городу + 300 ₽') {
		$(`#returnCustomPlace`).removeClass('customPlace-hidden');
		$(`#returnCustomPlace`).addClass('customPlace-visible');

		$(`#returnCustomPlace-wrap`).removeClass('customPlace-wrap-end');
		$(`#returnCustomPlace-wrap`).removeClass('customPlace-hidden');
		$(`#returnCustomPlace-wrap`).addClass('customPlace-visible');
	} else {
		setTimeout(() => {
			$(`#returnCustomPlace`).removeClass('customPlace-visible');
			$(`#returnCustomPlace`).addClass('customPlace-hidden');

			$(`#returnCustomPlace-wrap`).addClass('customPlace-hidden');
			$(`#returnCustomPlace-wrap`).addClass('customPlace-wrap-end');
			$(`#returnCustomPlace-wrap`).removeClass('customPlace-visible');
		}, 200);
	}


}

// ------------------------------------------------------------------------------------------------

export function hideCal() {
	$('.ex-inputs-picker').removeClass('ex-inputs-picker-visible');
}

// ------------------------------------------------------------------------------------------------

/**
 * @global
 * @type {Boolean}
 */
export let firstDateIsSelect = false;

// ------------------------------------------------------------------------------------------------
/**
 * @global
 * @type {Boolean}
 */
export let secondDateIsSelect = false;
// ------------------------------------------------------------------------------------------------

/**
 * @global
 * @type {Date}
 */

export let firstDate = '';

// ------------------------------------------------------------------------------------------------
/**
 * @global
 * @type {Date}
 */
export let secondDate = '';

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Date} dt
 * @returns {undefined}
 */
export const setFirstDate = (dt) => {
	firstDateIsSelect = true;
	firstDate = dt;
	getFreeReceiveTime();
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @returns {undefined}
 */

export const dropFirstDate = () => {
	firstDateIsSelect = false;
	firstDate = '';
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Date} dt
 * @returns {undefined}
 */
export const setSecondDate = (dt) => {
	secondDateIsSelect = true;
	secondDate = dt;
	getFreeReturnTime();
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @returns {undefined}
 */
export const dropSecondDate = () => {
	secondDateIsSelect = false;
	secondDate = '';
	clearReceiveDate();
	clearReturnDate();
}

// ------------------------------------------------------------------------------------------------
export function isDateShouldBeDisabled(timestamp) {
	let dt0 = new Date().toLocaleDateString().split(' ')[0];
	let dt1 = timestamp.toLocaleDateString().split(' ')[0];
	dt0 = dt0.split('.');
	dt0 = new Date(dt0[2], dt0[1], dt0[0]);

	dt1 = dt1.split('.');
	dt1 = new Date(dt1[2], dt1[1], dt1[0]);

	// if (dt0 > dt1)
	// return true;
	let dateAfterSelect = '';
	if (firstDateIsSelect) {
		dt0 = firstDate.toLocaleDateString().split(' ')[0];
		dt0 = dt0.split('.');
		dt0 = new Date(dt0[2], dt0[1], dt0[0]);
		if ((dt1 - dt0) > (1000 * 60 * 60 * 24 * 29)) return true;
		if ((dt1 - dt0) < (-1000 * 60 * 60 * 24 * 29)) {
			return true;
		}

		const dts = dataFromServer.freePeriods.filter(
			(perObj, carInx) => perObj.periods.some(
				(per) => {

					return per.some(
						(dt) => {
							if (isEqual(dt, firstDate)) {
								dataFromServer.carToBid.push(dataFromServer.freePeriods[carInx].car_id);
								return true;
							}

						}
					)
				}
			)
		);
		dataFromServer.carToBid = _.uniq(dataFromServer.carToBid);
		dateAfterSelect = dts;

	}


	const periods = dateAfterSelect ? dateAfterSelect : dataFromServer.freePeriods;
	//в этой непонятной куче кода происходит примернос следующее:
	//мы имеем 3 вложенных массива: periods <- periods (+ carid) <- timestaps
	//задача этого кода найти первое совпадение с timestamp в любом из вложенных массивов
	return !periods.some(
		(perObj) => perObj.periods.some(
			(per) => per.some(
				(dt, inx) => {
					if (isEqual(timestamp, dt)) {
						return true;
					}
				}
			)

		)
	)
}


// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 * @description проверка корректности выбора даты и вывод предупреждения по результатам
 */

export function checkingReceiveTime() {
	const time = percentsToTime($(this).val()).split(':');
	const fd = new Date(
		firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), parseInt(time[0], 10), parseInt(time[1], 10)
	);

	let busyCars = [];
	dataFromServer.rawPeriods.some(
		(rawPeriod) => {
			const res = rawPeriod.periods.some(
				(period) => {

					let begin = new Date(period.begin);
					let end = new Date(period.end);
					begin = addMinutes(begin, begin.getTimezoneOffset());
					end = addMinutes(end, end.getTimezoneOffset());
					if (
						!isWithinInterval(fd, {
							start: begin,
							end: end
						})
					) {
						$(this).val(timeToPercent(end));
						// busyCars.push(rawPeriod.car_id);
						return true;
					}
					return false;
				}
			)

			return res;
		}
	);
	const dateIsBad = busyCars.length === dataFromServer.rawPeriods.length - 3 ? true : false;
	if (dateIsBad) {
		dataFromServer.dateIsBad = true;
		$('#timeNotificsId').addClass('time_notifics-show');
		$('#notificsTimeLeft').addClass('notifics-time-left-show');
	} else {

		$('#notificsTimeLeft').removeClass('notifics-time-left-show');
		$('#timeNotificsId').removeClass('time_notifics-show');
	}
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @callback
 * @description проверка корректности выбора даты и вывод предупреждения по результатам
 */
export function checkingReturnTime() {
	const time = percentsToTime($(this).val());
	$('#timeNotificsId').removeClass('time_notifics-show');
	$('#timeNotificsId').removeClass('time_notifics-show');
	$('#notificsTimeLeft').removeClass('notifics-time-left-show');
}

/**
 * @function
 * @param {Date} time
 * @description проверяет дату на предмет того, является ли она пограничной, то есть является ли она begin или end
 */
function isBorder(time) {
	let periods = [];
	dataFromServer.rawPeriods.forEach(//ищем в сырых периодах пограничные дни
		(carAndPeriods, carInx) =>
			carAndPeriods.periods.forEach( //проверяем каждый период
				(item) => {
					let begin = new Date(item.begin);
					let end = new Date(item.end);
					let ltime = new Date(time);
					// -------------------------------------------------------
					// проблема в том, что при создании даты из значения полученного от сервера, к времени добавляется 3 часа
					begin = addMinutes(begin, begin.getTimezoneOffset())
					end = addMinutes(end, end.getTimezoneOffset())

					let lbegin = format(begin, 'yyyy-MM-dd');
					let lend = format(end, 'yyyy-MM-dd');
					ltime = format(time, 'yyyy-MM-dd');
					if (lend === ltime || lbegin === ltime) {
						const a = periods.findIndex(
							(p) => p.car_id === carAndPeriods.car_id
						);
						if (a >= 0) {
							periods[a].periods.push(
								{
									begin: begin,
									end: end,
								}
							);
						}
						else {
							periods.push({ car_id: carAndPeriods.car_id, periods: [] });
							periods[periods.length - 1].periods.push(
								{
									begin: begin,
									end: end,
								}
							);
						}
					}
				}
			)
	)
	return periods;
}
// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Date} time
 * @param {Period} intervals
 * @returns {Boolean}
 * @description определяет доступность даты с точки зрения группы интервалов: дата недоступна, если она находится между 00:00 и begin  или между end и begin двух периодов
 */
function timeIsUnvaiable(time, intervals, returnOffset) {
	//округление периодов начала до 00:00 текущего дня
	let timeIsFree = false;

	intervals.forEach(
		(carsAndPeriods) => {
			carsAndPeriods.periods.forEach(period => {
				const roundEnd = new Date(period.end.getFullYear(), period.end.getMonth(), period.end.getDate());
				const localPeriod = {
					begin: new Date(period.begin),
					end: new Date(period.end),

				}
				if (isBefore(localPeriod.begin, roundEnd) && roundEnd - localPeriod.begin > 1000 * 60 * 60 * 24)
					localPeriod.begin = roundEnd;
				if (returnOffset) {
					// localPeriod.end = addMinutes(localPeriod.end, dataFromServer.bufferTimeMin);
				}
				if (!timeIsFree && isWithinInterval(time, { start: localPeriod.begin, end: localPeriod.end })) {
					timeIsFree = true;
				}
			})
		}
	);
	return !timeIsFree;
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {Array} times - разленный по 15 минут firstDate
 * @param {Array} periods
 * @return {string} 
 * @description генерирует разметку для select для пограничных timestamp
 */


function borderTime(times, periods, returnOffset, retStr) {
	if (!firstDateIsSelect) return;
	let str = '';
	dataFromServer.disabledSecond.splice(0, dataFromServer.disabledSecond.length);
	times = times.map( //определяем доступность времени для брони, к недоступному времени добавляется !
		(item) => {
			if (
				timeIsUnvaiable(item, periods, returnOffset)
			) {
				dataFromServer.disabledSecond.push(format(item, 'HH:mm'));
				return format(item, '!HH:mm')
			}
			else
				return format(item, 'HH:mm')
		}
	)
	times.forEach( // генерируем разметку для доступного и недоступного времени
		(item, inx) => {
			if (item.charAt(0) === '!') {
				const tmStr = item.slice(1, item.length);
				str += genTimeHTML(`${tmStr}`, true, '') + '\n'
				return;
			}
			str += genTimeHTML(`${item}`, false, retStr) + '\n'
		}
	)
	return str;
}

// ------------------------------------------------------------------------------------------------
/**
 * @function
 * @param {string} timestr
 * @param {Boolean} disabled
 * @example getTimeHTML(11:00,true) {
 * 	return <option disabled> 11:00 </option>
 * 
 * @example getTimeHTML(10:00,false) {
 * 	return <option> 10:00 </option>
 * }
 * 
 */
export function genTimeHTML(timestr, disabled, returnStr) {

	return disabled ? `<option id="time-${timestr.replace(':', '-')}-${returnStr}" disabled> ${timestr} </option>` :
		`<option id="time-${timestr.replace(':', '-')}-${returnStr}" class="timeOption" > ${timestr} </option>`;
}

// ------------------------------------------------------------------------------------------------
/**
 * rendering date of receive time
 */
export function getFreeReceiveTime() {
	if (!firstDateIsSelect) return;
	let times = eachMinuteOfInterval({
		start: firstDate,
		end: addHours(firstDate, 24)
	}, {
		step: 15
	});
	times.splice(times.length - 1);  //удаляем 00:00 в конце интервала, так как это след. день

	let selStr = '';
	const borders = isBorder(firstDate);
	if (borders.length > 0) {
		selStr = borderTime(times, borders, false, false);
	} else
		times.forEach(
			item => {
				selStr += genTimeHTML(`${item.toLocaleTimeString().slice(0, 5)}`, false) + '\n'
			}
		);
	$('#selectReceiveDate').html(selStr);
}

// ------------------------------------------------------------------------------------------------
export function getFreeReturnTime() {
	if (!secondDateIsSelect) return;
	let times = eachMinuteOfInterval({
		start: secondDate,
		end: addHours(secondDate, 24)
	}, {
		step: 15
	});
	times.splice(times.length - 1);  //удаляем 00:00 в конце интервала, так как это след. день

	let selStr = '';
	const borders = isBorder(secondDate);
	if (borders.length > 0) {
		selStr = borderTime(times, borders, true, 'return');
	} else
		times.forEach(
			item => {
				selStr += genTimeHTML(`${item.toLocaleTimeString().slice(0, 5)}`, false, 'return') + '\n'
			}
		);
	$('#selectReturnDate').html(selStr);
}

/**
 * @function
 * @callback
 * @description этот колбек должен срабатывать при выборе времени брони. Смысл это функции в том, чтобы определить и сохранить id бронируемого авто для того, чтобы дальше определить время возврата 
*/
export function saveReceiveTime() {

	let firstTime = $(this).val();


}
//после выбора первого времени необходимо определить id авто и по нему определять время сдачи
export function offReturnTime() {

	if (!firstDateIsSelect || !secondDateIsSelect) return;

	let times = eachMinuteOfInterval({ //нарезаем день по 15 минут
		start: secondDate,
		end: addHours(secondDate, 24)
	}, {
		step: 15
	});

	times = times.map((time) => { //изменяем кусочки из timestamp в простое представление
		return format(time, 'HH:mm');
	});
	times.splice(times.length - 1); //удаляем 00:00



	if (firstDate.toLocaleDateString() != secondDate.toLocaleDateString()) return;
	let firstTime = $(`#selectReceiveDate`).val();
	const inx = times.findIndex((a) => a === firstTime);
	firstTime = firstTime.replace(':', '-');

	times.forEach(//создаем разметку активных элементов option
		(item) => {
			if (!dataFromServer.disabledSecond.find((a) => a === item)) {
				$(`#time-${item.replace(':', '-')}-return`).attr('disabled', null);
			}
		}
	);
	times.slice(0, inx + 1).forEach( //выключаем options если они более ранние или равны дате получения авто 
		(item) => {
			$(`#time-${item.replace(':', '-')}-return`).attr('disabled', true);
		}
	)
}


// ------------------------------------------------------------------------------------------------
export function clearReceiveDate() {
	$('#selectReceiveDate').html('');
}

// ------------------------------------------------------------------------------------------------
export function clearReturnDate() {
	$('#selectReturnDate').html('');
}

// ------------------------------------------------------------------------------------------------