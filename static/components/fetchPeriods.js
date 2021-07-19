
import 'regenerator-runtime/runtime'
import {dataFromServer} from '../state/dataFromServer'
import {getCarPeriodList} from '../connection/index'
import { addHours, addMinutes, format, startOfDecade } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm';


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

			start = addMinutes(start,start.getTimezoneOffset());
			end = addMinutes(end,end.getTimezoneOffset());

			if (format(end,'HH:mm:ss') === '00:00:00' && format(end,`yyyy:MM;dd`) != `${end.getFullYear()}:12;31`) {
					
				end = addMinutes(end,-60);
			}

			start = new Date(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate());	
			end = new Date(end.getUTCFullYear(),end.getUTCMonth(),end.getUTCDate());	

			res.push(
				eachDayOfInterval({start:start,end:end})
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
	const end  = dataFromServer.endFetchPeriod;

	dataFromServer.currentCar.forEach(
		 (item) => {
				const placeObj  = {
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
	res = res.map(
		(item,inx) => {
			return {
				car_id: dataFromServer.currentCar[inx].car_id,
				periods: intervalToArray(item),
			}
		}
	);
	dataFromServer.freePeriods = res;
}
