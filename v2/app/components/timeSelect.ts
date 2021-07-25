/**
 * @module timeSelect.ts
 * @description генерирует разметку для селекторов времени
*/

import eachMinuteOfInterval from "date-fns/eachMinuteOfInterval";
import { option } from "../shared/sharedActions";


export function  timeSelectorBy15Min (idModificator: string): string {

	const dateA = new Date(2021,1,1,0,0,0);
	const dateB = new Date(2021,1,2,0,0,0);
	const dateArr: Date[] =  eachMinuteOfInterval({start: dateA, end: dateB}, {step: 15});
	const shortTime: string[] = [];

	dateArr.forEach(
		(dt) => {
			shortTime.push(dt.toTimeString().slice(0,5));
		}
	);

	shortTime.splice(shortTime.length-1); //убираем 00:00 в конце дня, так как это уже следующий день

	let resStr = '';

	shortTime.forEach(
		(str) => {
			resStr += option(str,`${str.replace(':','-')}-${idModificator}`);
		}
	);
	return resStr;
}

