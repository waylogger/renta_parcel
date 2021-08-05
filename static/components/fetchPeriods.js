
import 'regenerator-runtime/runtime'
import { dataFromServer } from '../state/dataFromServer'
import { getCarPeriodList } from '../connection/index'
import { addHours, addMilliseconds, addMinutes, format, startOfDecade } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm';


/**
 * @function
 * @param {Array}
 * @returns perriod with offset
 * @description смысл функции в том, чтобы скорректировать период времени на буфферное время, необходимое для подготовки авто к очередной аренде (3 часа)
 * Если период отдыха менее 3 часов, то он удаляется 
*/
function correctingPeriodOnBufferTime(periods) {

	const res = periods.map(
		(period) => {
			let begin = new Date(period.begin);
			let end = new Date(period.end);
			end = addMinutes(end, end.getTimezoneOffset());
			begin = addMinutes(begin, begin.getTimezoneOffset());

			const diffOfEndAndBegin = end - begin;
			if (
				diffOfEndAndBegin < ((1000 * 60 * dataFromServer.bufferTimeMin)*2 + 1000 * 60 * 60)
			) {
				//если период свободы менее 4 часов, то он убирается, чтобы не допустить брони в этот период
				return;
			} else {
				begin = addMinutes(begin, dataFromServer.bufferTimeMin);
				end = addMinutes(end, -dataFromServer.bufferTimeMin)
			}
			end = format(end, 'yyyy-MM-dd HH:mm:ss');
			begin = format(begin, 'yyyy-MM-dd HH:mm:ss');
			end = `${end}Z`;
			begin = `${begin}Z`;
			return { begin, end };
		}

	);

	return res.filter((
		period => period
	));
}


/**
 * @function
 * @param {Array of Date} interval
 * @returns {Array}
 * @description массив промежутков и возвращает массивов массив timestamp по 1 на 1 день
 * @example  intervalToArray([{start: 01.11.2020, end: 03.11.2020}]) return 01.11.2020, 02.11.2020,03.11.2020
*/

function intervalToArray(arrayOfIntervals) {
	if (!arrayOfIntervals) return undefined;

	const res = [];

	arrayOfIntervals.forEach(
		(interval) => {
			let start = new Date(interval.begin);
			let end = new Date(interval.end);

			start = addMinutes(start, start.getTimezoneOffset());
			end = addMinutes(end, end.getTimezoneOffset());

			if (format(end, 'HH:mm:ss') === '00:00:00' && format(end, `yyyy:MM;dd`) != `${end.getFullYear()}:12;31`) {

				end = addMinutes(end, -60);
			}

			start = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
			end = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

			res.push(
				eachDayOfInterval({ start: start, end: end })
			);
		}
	);
	return res;
}




/**
 * @file fetchPeriods.js
 * @module client/components/fetchPeriods.js
*/


export async function getFreePeriods() {
	if (!dataFromServer.currentCar) return;
	if (!(dataFromServer.currentCar instanceof Array))
		return;
	const promises = [];

	const begin = dataFromServer.beginFetchPeriod;
	const end = dataFromServer.endFetchPeriod;

	dataFromServer.currentCar.forEach(
		(item) => {
			const placeObj = {
				car_id: item.car_id,
				begin: begin,
				end: end,
				include_reserves: true,
				include_idles: true,
			};
			promises.push(
				getCarPeriodList(placeObj)
			);
		}
	);

	let res = await Promise.all(promises);
	const reformat = res.map(
		(item, inx) => {
			return {
				car_id: dataFromServer.currentCar[inx].car_id,
				periods: intervalToArray(correctingPeriodOnBufferTime(item)),
			}
		}
	);
	dataFromServer.freePeriods = reformat;
	dataFromServer.rawPeriods = res.map(
		(item, inx) => {
			return {
				car_id: dataFromServer.currentCar[inx].car_id,
				periods: correctingPeriodOnBufferTime(item),
			}
		}
	);
}
